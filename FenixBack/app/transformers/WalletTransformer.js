import jbuilder from 'jbuilder';

const WalletTransformer = (wallets, attribute) => (
    jbuilder.encode(function(json) {
        json.set(attribute || 'data', function(json) {
            json.extract(wallets,'address', 'labels', 'network');
        });
    })
);

export default WalletTransformer;
