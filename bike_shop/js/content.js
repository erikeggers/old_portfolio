/*
 * Use AJAX to load the JSON and manipulate the HTML
 * https://jbonline.bitbucket.io/data/bikeshop.json
*/

//Create XMLHttpRequest object

var xhr = new XMLHttpRequest();

xhr.onload = function() {


    if(xhr.status === 200) {
        //Variable to store JSON data
        var responseObject = JSON.parse(xhr.responseText);

        //Featured Products
        var featuredProducts = document.querySelectorAll("#featuredProducts ul li");
        for (var i = 0; i < featuredProducts.length; i++) {
            featuredProducts[i].insertAdjacentHTML('afterBegin', '<div class="productImageWrapper"><img src="' + responseObject.products[i].imageURL + '" src="' + responseObject.products[i].title + '"></div>');
            featuredProducts[i].querySelectorAll('h3')[0].innerHTML = responseObject.products[i].title;
            featuredProducts[i].querySelectorAll('p')[0].innerHTML = responseObject.products[i].description;
            if (responseObject.products[i].salePrice === '') {
                featuredProducts[i].querySelectorAll('p')[1].innerHTML = '<b>$' + responseObject.products[i].price + '</b>';
            } else {
                featuredProducts[i].querySelectorAll('p')[1].innerHTML = '<b>$' + responseObject.products[i].salePrice + '</b> <del>$' + responseObject.products[i].price + '</del>';
            }
        }

        //Benefits
        var benefitsContainer = document.querySelector('#benefits .wrapper');
        var benefit = '';
        var input = '<input type="email" placeholder="name@example.com"><button>Sign Up</button>';

        for (var i = 0; i < responseObject.benefits.length; i++) {
            benefit += '<section><h3>' + responseObject.benefits[i].title + '</h3>';
            benefit += '<p>' + responseObject.benefits[i].description + '</p></section>';
        }

        if(benefitsContainer) {
            benefitsContainer.insertAdjacentHTML('beforeEnd', benefit);
            benefitsContainer.querySelectorAll('section')[2].insertAdjacentHTML('beforeEnd', input);
        }


        //Upcoming Events
        var eventTitle = document.querySelectorAll("#title th");
        var eventDate = document.querySelectorAll("#date td");
        var eventText = document.querySelectorAll("#aboutText td");
        for (var i = 0; i < eventTitle.length; i++) {
            eventTitle[i].innerHTML = responseObject.events[i].title;
            eventDate[i].innerHTML = responseObject.events[i].date;
            eventText[i].innerHTML = responseObject.events[i].text;
        }

        //Blog Posts
        var postsContainer = document.querySelector('#blogPosts');
        var blogPost = '<article>';
        for (var i = 0; i < responseObject.posts.length; i++) {

            blogPost += '<img src="' + responseObject.posts[i].imageURL + '" alt="' + responseObject.posts[i].title + '">';
            blogPost += '<h3>' + responseObject.posts[i].title + '</h3>';
            blogPost += '<p>' + responseObject.posts[i].postDate + '</p><br>';
            blogPost += '<p>' + responseObject.posts[i].text + '</p>';

        }

        if(postsContainer) {
            blogPost += '</article>';
            postsContainer.insertAdjacentHTML('beforeEnd', blogPost);
        }
    }
};

xhr.open('GET','https://jbonline.bitbucket.io/data/bikeshop.json', true);

xhr.send(null);