import { AsyncStorage } from "react-native";
import { userData } from '../../@types/index';
import track from '../tracking';
import { useNavigation  } from '@react-navigation/native';

export async function _archive(id: string) {
    try {
        let Fetched:any = await AsyncStorage.getItem('data');
        if (!Fetched) return;
        let data = JSON.parse(Fetched) as userData;
        data.parcels.filter(function(item, index) { 
            if (item.tracking != id) return;
            if (data.parcels[index].archived == false) {
                data.parcels[index].archived = true;
            } else {
                data.parcels[index].archived = false;
            }
            
        });
        AsyncStorage.setItem('data', JSON.stringify(data));
        console.log(data);
        return JSON.stringify(data);
    } catch (error) {
        console.log(error);
    }
}

export async function _update(id?: string) {
    if (id) return;
    const fetched  = await AsyncStorage.getItem('data');
        if (!fetched) return;
        const data = JSON.parse(fetched) as userData;
        let newData:any = data;
        newData.parcels = [];
        data.parcels.forEach(async function(item,index) {
            const trackData:[{data:string, hora:string, local:string, status:string}] = await track(item.tracking, item.carrier) as [{data:string, hora:string, local:string, status:string}];
            if (!trackData) {
                newData.parcels.push(item);
                return;
            };
            let data =
            {
                "id": item.tracking,
                "name": item.name,
                "last": trackData[trackData.length-1]?.status+'\n'+trackData[trackData.length-1]?.local,
                "events": trackData,
                'carrier': item.carrier,
                'tracking': item.tracking,
                'added_at': item.added_at,
                'updated_at': Date.now,
                'archived': item.archived
            }
            newData.parcels.push(data);
            return data;
        });

        AsyncStorage.setItem('data', newData);

    return;
}

export async function _delete(id: string) {
    try {
        let Fetched:any = await AsyncStorage.getItem('data');
        if (!Fetched) return;
        let data = JSON.parse(Fetched) as userData;
        data.parcels.filter(function(item, index) { 
            if (item.tracking != id) return;
            delete data.parcels[index];   
        });
        AsyncStorage.setItem('data', JSON.stringify(data));
        return JSON.stringify(data);
    } catch (error) {
        console.log(error);
    }
}

export async function _retrieveData() {
    try {
        let Fetched = await AsyncStorage.getItem('data');

        if (!Fetched) return;

        let data = JSON.parse(Fetched) as userData;
        if (data) {
            return data;
        }
    } catch (error) {
        return;
    }
}

export function _deleteAll() {
    AsyncStorage.clear();
    return;
};

export async function _saveData(dataToSave:any) {
    try {
    let newData:any, oldData:userData|undefined = undefined;
    const trackData:[{data:string, hora:string, local:string, status:string}] = await track(dataToSave.tracking, dataToSave.carrier) as [{data:string, hora:string, local:string, status:string}];
    if (!trackData) return;

    console.log(trackData);
    let Fetched = await AsyncStorage.getItem('data');
    
    if (Fetched) oldData = JSON.parse(Fetched) as userData;

    if (oldData) {
        newData =
        {
            "id": dataToSave.tracking,
            "name": dataToSave.name,
            "last": trackData[trackData.length-1]?.status+'\n'+trackData[trackData.length-1]?.local,
            "events": trackData,
            'carrier': dataToSave.carrier,
            'tracking': dataToSave.tracking,
            'added_at': Date.now,
            'archived': false
        };
        oldData.parcels.push(newData);
        AsyncStorage.setItem('data', JSON.stringify(oldData));
        return oldData;
    } else {
        newData = {
            'parcels': [
                {
                    "id": dataToSave.tracking,
                    "name": dataToSave.name,
                    "last": trackData[trackData.length-1].status+'\n'+trackData[trackData.length-1].local,
                    "events": trackData,
                    'carrier': dataToSave.carrier,
                    'tracking': dataToSave.tracking,
                    'added_at': Date.now,
                    'archived': false
                }
            ]
        };
        // console.log(newData);
        AsyncStorage.setItem('data', JSON.stringify(newData));
        return newData;
    }
}catch (error) {
    console.log(error);
}
}
