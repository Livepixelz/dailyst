import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// $(document).ready(function(){
//     $('body').on('click', '.btn', function(){
//
//         var $button = $(this);
//         if($button.hasClass('btn-daytime')) {
//             var timeOfDay = $button.data('timeofday');
//             $('.body_background').removeClass('active');
//             $('body').attr('class','');
//             $('.body--' + timeOfDay).addClass('active');
//             $('body').addClass(timeOfDay);
//         } else if ($button.hasClass('btn-display')) {
//             var displayType = $button.data('list-display');
//             $('.trackList').attr('class','trackList');
//             $('.trackList').addClass('display--' + displayType);
//         }
//
//     });
//
// });
ReactDOM.render(<App apiKey={"3750fc3b89c9ff609a6180bcc6ba8669"} username={"okend"} tracks={30} />, document.getElementById('react'));
registerServiceWorker();
