$(document).ready(function () {
    init();
});

async function init() {
    fill_best_film();

    let films = await get_best_rated();
    fill_category($(".best-rated")[0], films);

    let category_2 = "Mystery";
    $(".cat-2 h2").html(category_2);
    films = await get_films_from_category(category_2);
    fill_category($(".cat-2")[0], films);

    let category_3 = "Musical";
    $(".cat-3 h2").html(category_3);
    films = await get_films_from_category(category_3);
    fill_category($(".cat-3")[0], films);

    await get_genres();
    let category_others = $("#genres-select").val();
    console.log(category_others);
    films = await get_films_from_category(category_others);
    fill_category($(".others")[0], films);

    $("#genres-select").on("change", async function () {
        let selectedValue = $(this).val();
        $(".others .content").empty();
        films = await get_films_from_category(selectedValue);
        fill_category($(".others")[0], films);
    });
}

async function open_modal(film_id) {
    console.log(film_id);
    $(".modal").show();
    $(".best-film").hide();
    $(".category").hide();
    
    url = "http://localhost:8000/api/v1/titles/" + film_id;
    let response = await fetch(url);
    let film = await response.json();

    console.log(film);

    $('.modal h2').html(film.original_title);
    $('.modal #year').html(film.year);
    $('.modal #genres').html(film.genres.join(", "));
    $('.modal #duration').html(film.duration + " minutes");
    $('.modal #countries').html("(" + film.countries.join("/") + ")");
    $('.modal #score').html(film.imdb_score);
    // $('.modal #income').html("$" + film.worldwide_gross_income.toString());
    $('.modal #directors').html(film.directors.join(", "));

    $('.modal img').attr('src', film.image_url);
    $('.modal #description').html(film.long_description);
    $('.modal #actors').html(film.actors.join(", "));

}

async function close_modal(){
    $(".modal").hide();
    $(".best-film").show();
    $(".category").show();
}

async function fill_best_film() {

    let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    let data = await response.json();
    let films = data.results;

    best_film_url = films[0].url;
        
    response = await fetch(best_film_url);
    best_film = await response.json();
    
    $(".best-film .details h3").html(best_film.title);
    $(".best-film img").attr("src", best_film.image_url);
    $(".best-film .details p").html(best_film.description);
    $(".best-film button")[0].addEventListener("click", function () {
        open_modal(best_film.id);
        console.log("click");
    });
}

async function get_best_rated(){
    let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    let data = await response.json();
    let films = data.results;

    while (films.length < 7){
        response = await fetch(data.next);
        data = await response.json();
        films = films.concat(data.results);
    }
    
    return films.slice(1, 7);
}

async function get_films_from_category(category){
    url = "http://localhost:8000/api/v1/titles/?genre=" + category + "&sort_by=-imdb_score";
    let response = await fetch(url);
    let data = await response.json();
    let films = data.results;

    while (films.length < 6 && data.next != null){
        response = await fetch(data.next);
        data = await response.json();
        films = films.concat(data.results);
    }
    return films.slice(0, 6);
}

async function fill_category(category, films){
    for (let film of films) {
        let url = "http://localhost:8000/api/v1/titles/" + film.id;
        let response = await fetch(url);
        film = await response.json();

        let film_div = document.createElement("div");
        film_div.classList.add("film");
        $(category).find(".content")[0].appendChild(film_div);

        let film_img = document.createElement("img");
        film_img.src = film.image_url;
        film_div.appendChild(film_img);

        let strip_div = document.createElement("div");
        strip_div.classList.add("strip");
        film_div.appendChild(strip_div);

        let film_title = document.createElement("h4");
        film_title.innerHTML = film.original_title;
        strip_div.appendChild(film_title);

        let button = document.createElement("button");
        button.innerHTML = "Détails";
        button.classList.add("details-btn");
        button.addEventListener("click", function () {
            open_modal(film.id);
        });
        strip_div.appendChild(button);
    }
}

async function get_genres(){
    url = "http://localhost:8000/api/v1/genres/";
    let response = await fetch(url);
    let data = await response.json();
    let genres = data.results;

    while(data.next != null){
        response = await fetch(data.next);
        data = await response.json();
        genres = genres.concat(data.results);
    }

    genres.forEach(genre => {
        let option = document.createElement("option");
        option.textContent = genre.name;
        $("#genres-select")[0].appendChild(option);
    });
}

function showMore(category) {
    console.log(category);
    $(`.${category} .film`).show(); 
    $(`.${category} .show-more-btn`).html("Voir moins");
    $(`.${category} .show-more-btn`).attr("onclick", `showLess("${category}")`);
}

function showLess(category) {
    let films = $(`.${category} .film`);
    let windowWidth = $(window).width();

    if (windowWidth <= 480) { // Téléphone
        films.slice(2).hide();

    } else if (windowWidth <= 820) { // Tablette
        films.slice(4).hide();
    }

    $(`.${category} .show-more-btn`).html("Voir plus");
    $(`.${category} .show-more-btn`).attr("onclick", `showMore("${category}")`);

}