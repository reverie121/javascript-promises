const baseURL = "https://deckofcardsapi.com/api/deck";
var deckIsEmpty = false;

$(window).ready(async function() {

    // Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
    // Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
    $.getJSON(`${baseURL}/new/draw/?count=1`)
    .then(data => {
        var deck_id = data['deck_id'];
        const card = data['cards'][0];
        console.log(`${card['value']} of ${card['suit']}`);
        // Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
        // Once you have the card, make a request to the same API to get one more card from the same deck. 
        // Once you have both cards, console.log the values and suits of both cards.
        $.getJSON(`${baseURL}/${data['deck_id']}/draw/?count=1`)
        .then(data2 => {
            const card2 = data2['cards'][0];
            console.log(`${card['value']} of ${card['suit']} and ${card2['value']} of ${card2['suit']}`);
        })
    })
    // Build an HTML page that lets you draw cards from a deck. 
    // When the page loads, go to the Deck of Cards API to create a new deck, 
    // and show a button on the page that will let you draw a card. 
    // Every time you click the button, display a new card, until there are no cards left in the deck.
    .then( () => {
        $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`)
        .then (newDeck => {
            var deck_id = newDeck['deck_id'];
            $('#draw-button').on('click', async (e) => {
                if (!deckIsEmpty) {
                    $.getJSON(`${baseURL}/${deck_id}/draw/?count=1`).then(d => {
                        $('#cards-in-deck').text(`${d['remaining']}`);
                        $('#card').html(`
                            <div>${d['cards'][0]['value']}</div>
                            <div>of</div>
                            <div>${d['cards'][0]['suit']}</div>
                        `)
                        if (d['remaining'] < 1) {
                            deckIsEmpty = true;
                        }
                    });
                }
            });
        });
    });
});