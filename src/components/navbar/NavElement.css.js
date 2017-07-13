export default {
    button:{
        borderTopColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderBottomColor: '#E0BA51',
        borderLeftColor: '#e3ca86',

        borderWidth:' 4px 3px 4px 3px',
        borderStyle: 'solid',
        WebkitBorderRadius: '1px',
        MozBorderRadius: '1px',
        borderRadius: '1px',

        fontSize:'100%',
        fontFamily:'arial, helvetica, sans-serif',
        textDecoration:'none',
        display:'inline-block',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
        fontWeight:'bold',
        color:'#FFFFFF',

        backgroundColor: '#805D2C',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
        WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px;',

        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':active':{
            borderTopColor: 'rgb(167, 132, 106)',
            borderBottomColor: 'rgb(204, 161, 130)',
        },
        '@media screen and (max-width: 400px)': {
            display:'none'
        },

    },

    a: {
        display:'block',
        boxSizing: 'border-box',
        width: '100%',
        color: 'white',
        textAlign: 'center',
        padding: '8px 9px',
        textDecoration: 'none',

    }
};
