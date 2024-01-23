import axios from "axios";

const localserverURL = "http://localhost:4001";

// function start() {
//
// }
// start();

export function onClickSearch() {
  var name = document.getElementById("name").value;
  var distance = document.getElementById("distance").value;
  var rating = document.getElementById("rating").value;
  var price = document.getElementById("price").value;
  var cuisine = document.getElementById("cuisine").value;

  try {
    var result = [];
    // get data from server
    axios
      .post(`${localserverURL}/restaurants`, { name, distance, rating, price, cuisine })
      .then((response) => {
        try {
          const result = response.data;
          document.getElementById("result-list").innerHTML = "";
          document.getElementById("empty-list").innerHTML = "";
          if (result.length > 0) {
            for (let row of result) {
              var listHTML = document.getElementById("result-list");

              listHTML.innerHTML += `
            <li class="row-list">
            <h3> Restaurant: ${row.name}. </h3> 
                        <h4> Distance: ${row.distance} miles. </h4>
                        <h4> Rating: ${row.customerRating}/5. </h4>
                        <h4> Average price: $${row.price.toFixed(2)}. </h4>
                        <h4>Cuisine type: ${row.cuisine.name}.<h4>
                        </li>`;
            }
          } else {
            document.getElementById("empty-list").innerHTML = "<p>* No restaurants found</p>";
          }
        } catch (error) {
          console.log("error");
          alert(error);
          return;
        }
      })
      .catch((e) => {
        if (e.response?.data?.stack_trace) {
          document.getElementById("empty-list").innerHTML = `<p>* ${e.response?.data?.stack_trace}</p>`;
        } else {
          console.log(e);
          alert("Error to access data");
        }
      });
  } catch (error) {
    console.log("error");
    alert(error);
    return;
  }
}

var btn = document.getElementById("btn-search").addEventListener("click", onClickSearch);
