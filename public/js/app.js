$(document).ready(function(){
    var textarea = $('#source');
    var previewBlock = $('#output');

    function showSourcePreview(textarea){
        previewBlock.html(textarea.value);
    }
    showSourcePreview(textarea);

    textarea.on('keyup change', function(){
        showSourcePreview(this);
    });

    // ******** email send (smtp) *********
    $("#sendMailForm").on('submit', function(e){
        e.preventDefault();

        var dataObj = {};
        dataObj.html = textarea.val();
        dataObj.text = previewBlock.text().trim();
        dataObj.to = $('#emailTo').val();
        dataObj.subj = $('#emailSubj').val();

        if (!dataObj.to || !dataObj.html) {
            alert('Empty fields');
            return false;
        }

        console.log(dataObj);

        $.ajax({
            type: 'POST',
            data: dataObj,
            url: '/sendmail',
            success: function(data) {
                alert('Response: ' + JSON.stringify(data));
            },
            error: function(data) {
                alert('Error: ' + JSON.stringify(data));
            }
        });
    });
});
