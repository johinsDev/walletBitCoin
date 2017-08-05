export default function (req, res, next) {
    // this feature after if for plan
    req.user.getTotalWallets() <= 10 ? next() : res.send({message: 'The user has reached the wallet limit'});
};