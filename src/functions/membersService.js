import clientAxios from '../utils/axios';

export const getMembers = async () => 
    await clientAxios.get('/members');

export const createMember = async (member) => 
    await clientAxios.post('/members', member);

export const getMember = async (id) => 
    await clientAxios.get(`/members/${id}`);

export const editMember = async (id, member) => 
    await clientAxios.put(`/members/${id}`, member);

export const deleteMember = async (id) => 
    await clientAxios.delete(`/members/${id}`);
