//Variables
const apiKey="3d2937e88b17da9b83718499747f29dc";
var setNum="";
var url;
var partsUrl;
var data;

//Capture user input
$("#setSearch").on("submit", function(event) {
    event.preventDefault();
    setNum = $(this).find('#setNum').val();
    url=`https://rebrickable.com/api/v3/lego/sets/${setNum}/?key=${apiKey}`
    renderSet();
    //Hide search box after submit
    $('#setSearch').addClass('hidden');
    //Show restart button
    $('#resetButton').removeClass('hidden');
});

//Render the set view
var renderSet = () => {
    url=`https://rebrickable.com/api/v3/lego/sets/${setNum}/?key=${apiKey}`
    console.log(url)
    const parts = new Vue({
        el: '#set',
        data: {
            set: [],
        },
        mounted () {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.set = data
            })
        },
        template: `
        <div class="setContainer">
            <div v-if="set.detail != 'Not found.'" class="setInfo">
                <p><a :href="set.set_url" target="_blank" class="setName">{{ set.name }}</a></p>
                <p>Year: {{ set.year }}</p>
                <p><a href="#" onclick="renderParts()">Parts: {{ set.num_parts }} (View parts in the set)</a></p>
                <button id="resetButton" class="btn" onClick="window.location.reload()">Restart</button>
            </div>
            <div v-if="set.detail === 'Not found.'" class="setInfo">
                <p>Set not found. Try your search again.</p>
                <button id="resetButton" class="btn" onClick="window.location.reload()">Restart</button>
            </div>
            <div class="setImage">
                <img :src="set.set_img_url" :alt="set.name" class="setImage">
            </div>
        </div>
        `,
    })
}

//Render the parts view
var renderParts = () => {
    partsUrl=`https://rebrickable.com/api/v3/lego/sets/${setNum}/parts/?key=${apiKey}`
    console.log(partsUrl)
    const parts = new Vue({
        el: '#setParts',
        data: {
            parts: [],
        },
        mounted () {
            fetch(partsUrl)
            .then(response => response.json())
            .then(data => {
                this.parts = data
            })
        },
        template: `
        <div id="partContainer">
            <div class="part" v-for="part in parts.results">
                <div v-if="part.part.part_img_url != null" ><img :src="part.part.part_img_url" :alt="part.part.name" style="width:100px;"></div>
                <p>{{part.part.name}}</p>
                <p>Part number: {{part.part.part_num}}</p>
                <p>Color: {{part.color.name}}</p>
                <a :href="part.part.part_url" target="_blank">View and buy on Rebrickable.com</a>
            </div>
        </div>
        `,
    })
}

