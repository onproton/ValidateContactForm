/*
*
* Javascript/jQuery for validation that the text submitted does not contain user's contact information
* based on regex patterns. If the user has entered contact information into the message field that is
* recognized by the filter, the invalid information is replaced with either ***@***.*** if an email
* or ***-***-*** if a phone number
*
*/

$(function(){
// this is what jquery will execute as soon as the document model has loaded
    $('form.commentForm').submit(function(){
        filter($('#message').val());
        return false;
    });
});

//defines the rules for what might be considered email contact information with regex
var emailRules = {
    email: function(t) { return t.replace(/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/gi, "***@***.***"); }
};

//defines the rules for what might be considered phone contact information with regex


var usPhoneRules = {
    phone: function(t) { return t.replace(/1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/gi, "***-***-****"); }
};

/*Some of the different regex codes I've come up with for the international phone numbers, needs more testing
* maybe [+ ]?(\d)?[( ./-]?\d{1,4}[- ./)]?[ -./]?\d{2,4}[-. ]?\d{3,4}\b
* (\W\d{2,3})*(\+)*\d{1,3}?\W+([2-9][0-8][0-9])\W*([2-9][0-9]{1,4})\W*([0-9]{2,4})*(\se?x?t?(\d*))?
*/
var intlPhoneRules = {
    phone: function(t) { return t.replace(/[+ ]?(\d)?[( ./-]?\d{1,4}[- ./)]?[ -./]?\d{2,4}[- /.]?\d{3,4}\b/gi, "***-***-****"); }
};


var userNameRules = {
    phone: function(t) { return t.replace(/(username)+((\s)*(\W)*)*(\s*is*\s)*(?:\s*\S+)?/gi, "**********"); }
};



//loops over all the methods of the rules object and returns the filtered output to a paragraph in the html
function filter(text) {
    for (var e in emailRules) { text = emailRules[e](text); }
    for (var p in usPhoneRules) { text = usPhoneRules[p](text); }
    for (var l in intlPhoneRules) { text = intlPhoneRules[l](text); }
    for (var u in userNameRules) { text = userNameRules[u](text); }

    $('#output').text(text);
}
