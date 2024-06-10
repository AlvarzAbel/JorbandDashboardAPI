import { Dropdown } from 'primereact/dropdown';
import { SongModel } from '../../../models/Model.Song';
import { OrderList } from 'primereact/orderlist';

interface Props {
    songList: any;
    setSongList: any;
}

export const OrdenarList = ({ songList, setSongList }: Props) => {

    const updateSong = (song: SongModel, e: any) => {
        setSongList((prevSongList: any) => {
            const updatedList = prevSongList.map((existingSong: any) => {
                if (existingSong._id === song._id) {
                    return { ...existingSong, chord: [e.value] };
                }
                return existingSong;
            })
            return updatedList;
        })
    }

    const itemTemplate = (item: SongModel) => {
        const options = item.chord;
        const isDisabled = item.chord.length > 1 ? false : true;

        return (
            <div className='flex justify-content-between col-12'>
                <span >{item.name}</span>
                <Dropdown
                    value={isDisabled ? item.chord[0] : item.chord}
                    placeholder={item.chord[0]}
                    onChange={(e) => updateSong(item, e)}
                    options={options}
                    disabled={isDisabled}
                />

            </div>
        );
    };

    return (
        <div>
            <OrderList
                value={songList}
                onChange={(e) => setSongList(e.value)}
                itemTemplate={itemTemplate}
            />

        </div>
    )
}
