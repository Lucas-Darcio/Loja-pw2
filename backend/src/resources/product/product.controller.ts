import { Request, Response } from "express";
import { CreateProductDTO } from "./product.types";
import { getAllProducts, createProducts, getProduct, productAlreadyExists, updateProduct, removeProduct } from "./product.services";
import { ReasonPhrases, StatusCodes } from "http-status-codes";


const index = async (req: Request, res: Response) => {

    try{
        const products = await getAllProducts();

        res.status(StatusCodes.OK).json(products);
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
}


const create = async (req: Request, res: Response) => {


    try{
        const product = req.body as CreateProductDTO;

        if( (await productAlreadyExists(product.name)) ) {
            res.status(StatusCodes.CONFLICT).json({msg:"Nome de produto já existe", prod:product});
        }

        else{
            const newProduct = await createProducts(product);

            res.status(StatusCodes.CREATED).json(newProduct);

        }

    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);

    }

}

const read = async (req: Request, res: Response) => {

    try{
        const id = req.params.id as string
        const product = await getProduct(id);

        if(!product) {
            res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
        }

        else {
            res.status(StatusCodes.OK).json(product);
        }
    }

    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
}

const update = async (req: Request, res: Response) => {

    try{
        const id = req.params.id as string;
        const productNew = req.body as CreateProductDTO;

        const updatedProduct = await updateProduct(id, productNew);

        res.status(StatusCodes.OK).json(updatedProduct);


    }

    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Erro no update de objeto", e});
    }
}

const remove = async (req: Request, res: Response) => {

    try{
        const id = req.params.id as string;

        const removedProduct = await removeProduct(id);

        res.status(StatusCodes.OK).json(removedProduct);
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Erro ao remover o objeto", e});

    }

}


export default {index, read, create, update, remove}