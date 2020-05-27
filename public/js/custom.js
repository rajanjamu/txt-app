console.log('File connected!')

$('#toggle-sidebar-btn').click(() => {
    $('.ui.sidebar').sidebar('toggle')
})

// $('.left.sidebar').first()
//     .sidebar('attach events', '#toggle-sidebar-btn')