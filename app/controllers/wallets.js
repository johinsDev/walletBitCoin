import Wallet from '../models/wallet';
import BlockIo from '../models/blockIo';
import HTTPStatus from 'http-status';
import { NotFoundError } from '../../config/errors';
const blockIo = new BlockIo()

const create = (req, res, next) => {
    const wallet = new Wallet();
     blockIo.get_new_address({'label': `${wallet._id}`}, (err, address) => {
        if (address.status == 'fail'){
            return res.status(HTTPStatus.CONFLICT).json(data); 
        }
        wallet.label = address.data.label;
        wallet.network = address.data.network;
        wallet.address = address.data.address;
        wallet.user = req.user;
        wallet.save();
        req.user._wallets.push(wallet);
		req.user.save();
        return res.json(wallet);
    });
}
//crear la transaccion si es exitosa
//entonces generar un pago en la tabl con el valor con el costo y otros datos q responda block io
// ID	e03889fd-c573-4b30-afe7-863fec6ac125
// Destinatario	2Mzy8Eskyi92F7ByLiT9EvozTxFyvVUgbUS
// Crypto Txid	b4e8e6ceeff688d5fa79c9a27376091daf4eea49309342f9379a7b8769891a90
// Monto	0 BTC
// Costo	0.00097053 BTC  
// Total	0.01 BTC
// Estado	Completado
// revisar tabla comisiones para las transacciones que hace mario
// url payments o pagos donde los liste
// url transactions coon los ingresos
// summary que regresa los datos del resumen
//son unas cuantas consultas
// logout caducar el token
//refresh token
//luego mirar como actulizar nuestra tabla de wallets

const show = (req, res) => {
    blockIo.get_address_by_label({'label': req.params.id}, (err, wallet) => {
        if (wallet.status == 'fail'){
            return res.status(HTTPStatus.CONFLICT).json(wallet); 
        }
        return res.status(HTTPStatus.OK).json(wallet.data);
    });
}

const update = (req, res) => {
  
}

const get = (req, res) => res.json(req.user._wallets);


module.exports = {
  create,
  show,
  update,
  get
}