import { hieqService } from 'utils';

export const getProfile = () => hieqService.get('/user');

export const listUsers = () => hieqService.get('/user/list');