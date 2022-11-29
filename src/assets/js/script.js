$(document).ready(function(){
    const result = {};
    const totalStep = 14;
    let curStep = 1;
    let stepHistory = [];
    
    function setProgress() {
        const percent = curStep / totalStep * 100;
        $('.progress').width(`${percent}%`);
    }

    function displayNextStep(element, nextId) {
        const curStepId = `step${curStep}`;
        const curNextId = nextId ? nextId : curStep + 1;
        const nextStepId = `step${curNextId}`;
        $(`#${nextStepId}`).show();
        $(`#${curStepId}`).css({left: 'auto', right: 'auto'});
        $(`#${nextStepId}`).css({left: 'auto', right: 'auto'});
        const left = $(`#${nextStepId}`).css('left');
        $(`#${nextStepId}`).css({left: '1000px', opacity: '0'});
        $(`#${curStepId}`).animate({right: '1000px', opacity: '1'}, 'fast', function() {
            $(`#${curStepId}`).hide();
        });
        $(`#${nextStepId}`).animate({left: left, opacity: '1'}, '0');
        stepHistory.push(curStep);
        curStep = curNextId;

        if(element == null)
            return;

        const answer = $(element).find('div').text();
        result[curStep] = answer;
    }

    function displayPrevStep() {
        const lastStep = stepHistory.pop();
        const curStepId = `step${curStep}`;
        const nextStepId = `step${lastStep}`;
        $(`#${nextStepId}`).show();
        $(`#${curStepId}`).css({left: 'auto', right: 'auto'});
        $(`#${nextStepId}`).css({left: 'auto', right: 'auto'});
        const right = $(`#${nextStepId}`).css('right');
        $(`#${nextStepId}`).css({right: '1000px', opacity: '0'});
        $(`#${curStepId}`).animate({left: '1000px', opacity: '0'}, 'fast', function() {
            $(`#${curStepId}`).hide();
        });
        $(`#${nextStepId}`).animate({right: right, opacity: '1'}, '0');
        curStep = lastStep;
    }

    $(document).on('click', '.normal-button', function() {
        const nextStepId = $(this).data('step');
        $(this).parents('.section-main-container').find('.ticker').hide();
        $(this).parents('.section-main-container').find('.marked').toggleClass('marked');
        $(this).find('.ticker').show();
        $(this).toggleClass('marked');
        displayNextStep(this, nextStepId);
        setProgress();
    });

    $(document).on('click', '.next-action', function() {
        const elements = $(this).parent().find('.normal-input');
        var flag = true;
        console.log(elements, elements.length);
        for(var i = 0; i < elements.length; i++) {
            const element = elements[i];
            console.log(element);
            const key = $(element).attr("name");
            const value = $(element).val();
            result[key] = value;
            if(value.length === 0) {
                flag = false;
                $(element).parent().parent().addClass("required");
            } else {
                $(element).parent().parent().removeClass("required");
            }
        }
        if(!flag) return;
        displayNextStep(null);
        setProgress();
    });
    
    $(document).on('click', '.back-action', function() {
        displayPrevStep();
        setProgress();
    });

    $(document).on('click', '.agency .more-button', function() {
        $(this).hide();
        $('.agency .less-button').show();
        $('.description').slideToggle();
    });

    $(document).on('click', '.agency .less-button', function() {
        $(this).hide();
        $('.agency .more-button').show();
        $('.description').slideToggle();
    });

    $(document).on('click', '.faq .more-button', function() {
        $(this).hide();
        $(this).parent().find('.less-button').show();
        $(this).parent().find('.faq-desc').slideToggle();
    });

    $(document).on('click', '.faq .less-button', function() {
        $(this).hide();
        $(this).parent().find('.more-button').show();
        $(this).parent().find('.faq-desc').slideToggle();
    });


    $(document).on('keyup', '#phone-input', function() {
        var num = $(this).val().replace(/\D/g,''); 
        $(this).val('(' + num.substring(0,3) + ') ' + num.substring(3,6) + '-' + num.substring(6,10)); 
    });

    $(document).on('keyup', '.normal-input', function() {
        var text = $(this).val();
        if(text.length == 0)
            $(this).parent().parent().addClass('required');
        else
            $(this).parent().parent().removeClass('required');
    });

    setProgress();
});