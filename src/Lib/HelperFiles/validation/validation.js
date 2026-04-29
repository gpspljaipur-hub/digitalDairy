import String from "../../../comman/String"

const commonRegex = /^[a-z A-Z 0-9.,;\s ?]*$/

const commonFormat = {
    pattern: commonRegex,
    message: 'Please enter valid data'
}

const validation = {
    emailMobile: {
        presence: {
            message: 'Please enter your email/phone number'
        },
        format: {
            pattern: /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/,
            message: 'Please enter a valid email/phone number'
        }
    },

    profile_Contact: {
        presence: {
            message: 'Please enter phone number'
        },
        format: {
            pattern: /^[0-9]\d{2}-\d{3}-\d{4}/,
            message: 'Invalid Mobile Number'
        }
    },

    mobile1: {
        presence: {
            message: 'Please enter phone number'
        },
        format: {
            pattern: /^[0-9]{10}$/,
            message: 'Invalid Mobile Number'
        }
    },

    subject: {
        presence: {
            message: 'Please enter subject'
        }
    },

    Message: {
        presence: {
            message: 'Please enter your message'
        }
    },
    AddRequest: {
        presence: {
            message: 'Please enter Add Request'
        }
    },
    Sector: {
        presence: {
            message: 'Plaese Select Sector'
        }
    },

    parcelName_error: {
        presence: {
            message: 'Please enter your parcel name'
        },
        format: {
            pattern: /^(?!\s*$|\s).[a-z A-Z 0-9]{0,19}$/,
            message: 'Parcel Name should not be more than 20 characters'
        }
    },

    mobile: {
        presence: {
            message: 'Please enter phone number'
        },
        format: {
            // pattern: /^[0-9]*$/,
            pattern: /^(?:[1-9]\d*|0)$/,
            message: 'Please enter a valid Mobile Number'
        },
        length: {
            minimum: 10,
            message: 'Please enter a valid Mobile Number',
        }
    },

    email: {
        presence: {
            message: 'Please enter your email'
        },
        format: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email'
        }
    },

    collection: {
        presence: {
            message: 'Please enter your Collection'
        }
    },
    coupon: {
        presence: {
            message: ' Please enter the Coupon Code.'
        }
    },

    full_name: {
        presence: {
            message: 'Please enter your Full Name'
        }
    },
    first_name: {
        presence: {
            message: 'Please enter your First Name'
        }
    },

    last_name: {
        presence: {
            message: 'Please enter your Last Name'
        }
    }
}

export default validation
