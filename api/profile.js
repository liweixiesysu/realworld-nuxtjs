import { request } from '@/plugins/request';

export const followUser = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    });
}

export const unfollowUser = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    });
}

export const getProfile = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    });
}