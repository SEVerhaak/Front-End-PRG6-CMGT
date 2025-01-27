import {useEffect} from "react";

function AllesGaatWeg(){
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`https://prg06-node-express.antwan.eu/spots/`, {
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                //console.log(data.items);
                succesHandler(data.items)
            } catch (error) {
                console.error('Fout bij het ophalen van het product:', error);
            }
        }

        fetchProduct();
    }, []);


    function succesHandler(data){

        let idArray = [];

        for (let i=0; i < data.length; i++){
            idArray.push(data[i].id);
        }

        theEverythingDeleter(idArray);
        console.log(idArray);
    }

    function theEverythingDeleter(idArray){
        for (let i=0; i<100; i++){
            async function deleteSpots() {
                try {
                    const response = await fetch(`https://prg06-node-express.antwan.eu/spots/` + idArray[i], {
                        method: 'DELETE', // Specify DELETE method
                        headers: {
                            'Accept': 'application/json',
                        },
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            deleteSpots();
        }
    }

}

export default AllesGaatWeg;