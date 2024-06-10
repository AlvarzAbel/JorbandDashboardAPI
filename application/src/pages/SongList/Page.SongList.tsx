import { Button } from 'primereact/button';
import { DataTableContainer } from './components/DataTableContainer';
import { useAuthContext } from '../../context/Context.Auth';
import { ADMIN } from '../../utils/Util.Constants';
import { useState } from 'react';
import { AddSongComponent } from './components/Component.AddSong';
import { RemoveComponent } from './components/Component.RemoveSong';

export const SongListPage = () => {

    const { loggedUserData } = useAuthContext()!

    const [addSongDialog, setAddSongDialog] = useState(false);
    const [removeSongDialog, setRemoveSongDialog] = useState(false);

    return (
        <div className='page-container'>
            <div className="col-12 content-header">
                <h2>Listado de Canciones</h2>
                {
                    loggedUserData.user?.profile.includes(ADMIN) && (
                        <div className="div">
                            <Button label='Agregar' severity='success' className='mr-2' onClick={() => setAddSongDialog(true)} />
                            <Button label='Eliminar' severity='danger' onClick={() => setRemoveSongDialog(true)} />
                        </div>
                    )
                }
            </div>
            <DataTableContainer />
            <AddSongComponent visible={addSongDialog} setVisibe={setAddSongDialog} />
            <RemoveComponent visible={removeSongDialog} setVisibe={setRemoveSongDialog} />
        </div>
    )
}
