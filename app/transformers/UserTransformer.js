import jbuilder from 'jbuilder';

const UserTransformer = (users, attribute) => (
    jbuilder.encode(function(json) {
        json.set(attribute || 'data', function(json) {
            json.extract(users,'email', 'username');
        });
    })
);

export default UserTransformer;