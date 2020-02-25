let Store = null;

function setRef (ref) { Store = ref }

function add(doc) {
    Store.collection("users").add(doc)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export default {setRef, add};