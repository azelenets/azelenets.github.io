// fullpage customization
$('#fullpage').fullpage({
    sectionsColor: ['#2B577A', '#f05f40', '#F2AE72', '#5C832F', '#B8B89F'],
    sectionSelector: '.vertical-scrolling',
    slideSelector: '.horizontal-scrolling',
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
    menu: '#menu',

    afterLoad: function(anchorLink, index) {
        if(index == 3){
            $('.service-box').addClass('visible bounceIn').removeClass('invisible');
        }
        else{
            $('.service-box').removeClass('visible bounceIn').addClass('invisible');
        }
        if (index == 5) {
            $('.fa-phone, .fa-envelope-o').addClass('visible bounceIn').removeClass('invisible');
        }
        else{
            $('.fa-phone, .fa-envelope-o').removeClass('invisible bounceIn').addClass('invisible');
        }
    }
});