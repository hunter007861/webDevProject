import React, { useEffect } from 'react';
import AdminNav from '../components/AdminNav';
import './AdminPage.css'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef } from 'react';
import { useState } from 'react';
import { Axios } from '../AxiosConfig';
import { ToastContainer as Toast, toast } from 'react-toastify';

const AdminPage = () => {
    const [addedImage, setAddedImage] = useState();
    const [selected, setSelected] = useState();
    const [selectedIndex, setSelectedIndex] = useState();
    const imageTrigger = useRef(null)
    const [products, setProducts] = useState([])

    const initialValue = {
        productName: "",
        price: "",
        description: "",
        img: ""
    }

    useEffect(() => {
        Axios.get("/getproducts").then(async (res) => {
            setProducts(res.data)
        })
    }, [])

    const handleOnAddImage = async (event) => {
        event.preventDefault();
        event.persist();
        let files = await event.target?.files
        var mimeType = files[0]?.type;
        if (files) {
            if (mimeType?.includes('image')) {
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = (_event) => {
                    setAddedImage(_event.target.result)
                };

            } else console.log("Invalid file format");
        }

    }

    const inputTextChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _food = { ...selected };
        _food[`${name}`] = val;
        setSelected(_food);
    }

    const onSubmit = async (values, { resetForm }) => {
        const imgForm = new FormData();
        imgForm.append("image", values.img)

        await Axios.post("/uploadimage", imgForm, {
            headers: {
                "accept": "application/json",
                "Accept-Language": "en-us,en;q=0.8",
                "Content-Type": "multipart/form-data; boundary=" + imgForm._boundary,
            }
        }).then(async (res) => {
            const postData = { ...values, image: res.data.id }
            await Axios.post("/addproduct", { productName: postData.name, price: postData.price, description: postData.description, image: postData.image }).then((res) => {
                setProducts([...products, { ...postData, imgValue: addedImage }])
                toast.success(res.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                resetForm();
                setAddedImage()

            })
        }).catch(() => {
            toast.error("Failed to add")
        });
    }

    const onUpdate = async () => {
        let dataUp = { ...selected }
        let _products = [...products]
        _products[selectedIndex] = dataUp
        console.log(dataUp)
        setProducts(_products)
        toast.success("Updated Sucessfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const onDelete = async (i, a) => {
        await Axios.delete(`/deleteproducts/${i._id}`).then((res) => {
            let _products = products.filter((val) => val._id !== i._id);
            setProducts(_products)
            toast.success(res.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }
    return (
        <div>
            <AdminNav />
            <Toast />
            <div className='table_Container'>
                <div className='d-flex justify-content-between mb-3'>
                    <h3 className='font1'>Products table</h3>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Product</button>
                </div>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Picture</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((i, a) => {
                            return (
                                <tr>
                                    <th scope="row">{a}</th>
                                    <td><img src={i.imgValue === undefined ? `http://localhost:5000/getimage/${i.image}` : i.imgValue} className="tb_prodImg" /></td>
                                    <td> {i.productName}</td>
                                    <td>€ {i.price}</td>
                                    <td>{i.description}</td>
                                    <td><div className='d-flex'><IconButton color='primary' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => { setSelected(i); setSelectedIndex(a) }}><EditIcon /></IconButton> <IconButton color='error' onClick={() => { onDelete(i, a) }}><Delete /></IconButton></div></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={onSubmit}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <div className="modal-body">

                                        <div className='addImage d-flex align-items-center justify-content-center'>
                                            {addedImage != null ? <img src={addedImage} alt="" style={{ width: "90px" }} onClick={() => { imageTrigger.current.click() }} /> :
                                                <IconButton style={{ padding: "35px" }} color='primary' onClick={() => { imageTrigger.current.click() }}><AddCircleIcon /></IconButton>}
                                            <input hidden type="file" accept="image/*" ref={imageTrigger} onChange={(e) => { handleOnAddImage(e); setFieldValue("img", e.target.files[0]) }} />
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <label htmlFor="name">Name</label>
                                            <Field className="mb-0" type="text" id="name" name="name" />
                                            <ErrorMessage component="div" name="name" className="signupError" />
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <label htmlFor="price">Price</label>
                                            <Field className="mb-0" type="number" id="price" name="price" />
                                            <ErrorMessage component="div" name="name" className="signupError" />
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <label htmlFor="description">Description</label>
                                            <Field className="mb-0" type="text-area" id="description" name="description" />
                                            <ErrorMessage component="div" name="descriptiom" className="signupError" />
                                        </div>


                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Item</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='addImage d-flex align-items-center justify-content-center'>
                                <img src={`http://localhost:5000/getimage/${selected?.image}`} alt="" style={{ width: "90px" }} onClick={() => { console.log(selected) }} />
                            </div>
                            <form onSubmit={onSubmit}>
                                <label htmlFor="productName">Name</label>
                                <input type="text" id="name" name="name" defaultValue={selected?.productName} onChange={(e) => { inputTextChange(e, "productName") }} />
                                <label htmlFor="price">Price</label>
                                <input type="number" id="price" name="price" defaultValue={selected?.price} onChange={(e) => { inputTextChange(e, "price") }} />
                                <label htmlFor="decription">Price</label>
                                <input type="description" id="description" name="description" defaultValue={selected?.description} onChange={(e) => { inputTextChange(e, "description") }} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { onUpdate() }}>Update Item</button>
                        </div>

                        {/* <Formik
                            initialValues={{
                                productName:"Delicious Pizza"
                            }}
                            onSubmit={onUpdate}
                        >
                            {({ setFieldValue, props }) => (
                                <Form>
                                    <div className="modal-body">

                                        <div className='addImage d-flex align-items-center justify-content-center'>
                                            <img src={`http://localhost:5000/getimage/${selected?.image}`} alt="" style={{ width: "90px" }} onClick={() => {console.log(selected) }} />
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <label htmlFor="name">Name</label>
                                            <Field className="mb-0" type="text" id="productName" name="productName"  />
                                            <ErrorMessage component="div" name="name" className="signupError" />
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <label htmlFor="price">Price</label>
                                            <Field className="mb-0" type="number" name="price"/>
                                            <ErrorMessage component="div" name="name" className="signupError" />
                                        </div>
                                        <div className="d-flex flex-column mb-2">
                                            <label htmlFor="description">Description</label>
                                            <Field className="mb-0" type="text-area" name="description"/>
                                            <ErrorMessage component="div" name="descriptiom" className="signupError" />
                                        </div>


                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Item</button>
                                    </div>
                                </Form>
                            )}
                        </Formik> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage