const followerService = require('../../modules/follower/follower.service');
const followerModel = require('../../modules/follower/follower.model');

const mockService = (serviceName, res, isErr) => {
    jest.spyOn(followerModel, serviceName).mockImplementation(() => {
        if (isErr) {
            return Promise.reject(res);
        } else {
            return Promise.resolve(res);
        }
    });
};

describe('Follower service', () => {
    const followerServiceProto = Object.getPrototypeOf(followerService);
    Object.setPrototypeOf(followerService, Object.assign(followerServiceProto, followerModel));

   test('follow user (proper fields)', () => {
       const fields = {
           followerId: '1515',
           targetId: '1212'
       };
       const follow = {
           followerId: '1515',
           targetId: '1212'
       };
        mockService('create', follow);
        expect(followerService.followPerson(fields)).resolves.toEqual(follow);
   });

    test('follow user (improper values)', () => {
        const fields = {
            followerId: ['1515'],
            targetId: ['1212']
        };
        mockService('create', new Error('Db validation error'), true);
        expect(followerService.followPerson(fields)).rejects.toThrowError();
    });

    test('unfollow user (proper values)', () => {
        mockService('findOne', { id: 1, status: 'Accepted', followerId: '1414', targetId: '1212', destroy: jest.fn( () => 1) });
        expect(followerService.unfollowPerson('1212', '1414')).resolves.toBe(1);
    });

    test('unfollow user (improper values)', () => {
        mockService('findOne', new Error('Db error'), true);
        expect(followerService.unfollowPerson(['22'], ['14'])).rejects.toThrowError();
    });
});