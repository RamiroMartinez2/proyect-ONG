const public_key = "TEST-b3976690-a514-4288-83bc-a1c63a5fde2c"
const PROD_ACCESS_TOKEN = "TEST-3600401874351778-062221-335079e47b8747b5f0ce5391a7f411c3-357562799"
const url = "https://api.mercadopago.com/v1/payments?access_token=TEST-3600401874351778-062221-335079e47b8747b5f0ce5391a7f411c3-357562799"


export function PaymentService  () {

    
                return fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({
                            "additional_info": {
                              "items": [
                                {
                                  "id": "PR0001",
                                  "title": "Point Mini",
                                  "description": "Producto Point para cobros con tarjetas mediante bluetooth",
                                  "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
                                  "category_id": "electronics",
                                  "quantity": 1,
                                  "unit_price": 58.8
                                }
                              ],
                              "payer": {
                                "first_name": "Test",
                                "last_name": "Test",
                                "phone": {
                                  "area_code": 11,
                                  "number": "987654321"
                                },
                                "address": {}
                              },
                              "shipments": {
                                "receiver_address": {
                                  "zip_code": "12312-123",
                                  "state_name": "Rio de Janeiro",
                                  "city_name": "Buzios",
                                  "street_name": "Av das Nacoes Unidas",
                                  "street_number": 3003
                                }
                              },
                              
                            },
                            "description": "Payment for product",
                            "external_reference": "MP0001",
                            "installments": 1,
                            "metadata": {},
                            "order": {
                              "type": "mercadopago",
                              "id": 123456,
                              
                            },
                            "payer": {
                              "entity_type": "individual",
                              "type": "customer",
                              "identification": {},
                            },
                            "payment_method_id": "visa",
                            "transaction_amount": 58.8
                          }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json, charset=UTF-8',
                        },
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    
                })
                .catch(err => {
                    console.log(err)
                    
                })
            }
