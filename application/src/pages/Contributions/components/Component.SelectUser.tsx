import { Dropdown } from 'primereact/dropdown'
import { useState, useEffect } from 'react';
import { UserService } from '../../../services/Service.User';

export const SelectUser = ({ selectedUser, name, onChange }: any) => {

    const [userList, setUserList] = useState([]);
    const userService = new UserService();

    useEffect(() => {
        getUserList();
    }, [])

    const getUserList = async () => {
        const list = await userService.getUsers();
        setUserList(list.data.result);
    }

    return (
        <Dropdown
            value={selectedUser}
            onChange={onChange}
            options={userList}
            optionLabel={'name'}
            optionValue='id'
            name={name}
            placeholder="Seleccionar"
            className="w-full "
        />
    )
}
