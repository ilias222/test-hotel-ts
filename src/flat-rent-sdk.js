const database = [
    {
        id: 'vnd331',
        name: 'Radisson Royal Hotel',
        description: 'Отель расположен в 4 минутах ходьбы от станции метро «Маяковская». К услугам гостей фитнес-центр и спа-центр с сауной и гидромассажной ванной.',
        image: './photo/vnd331.png',
        coordinates: [59.9322936,30.3460129],
        bookedDates: [],
        price: '12000'
    },
    {
        id: 'ab2e2',
        name: 'Номера на Садовой',
        description: 'Расположен в 7 минутах ходьбы от Невского проспекта. К услугам гостей круглосуточная стойка регистрации и бесплатный Wi-Fi.',
        image: './photo/ab2e2.png',
        coordinates: [59.930325,30.3291592],
        bookedDates: [],
        price: '4500'
    },
    {
        id: 'mvm32l',
        name: 'Мини Отель на Невском 136',
        description: 'Мини-отель расположен в Санкт-Петербурге, в 5 минутах ходьбы от станции метро «Площадь Восстания» и Московского железнодорожного вокзала.',
        image: './photo/mvm32l.png',
        coordinates: [59.9299603,30.3658932],
        bookedDates: [],
        price: 3800
    },
    {
        id: 'bvep12',
        name: 'Отель Усадьба Державина',
        description: 'Прекрасный отель недалеко от Исаакиевского собора с бесплатным Wi-Fi на всей территории.',
        image: './photo/bvep12.png',
        coordinates: [59.9194966,30.309389],
        bookedDates: [],
        price: 8700
    }
]


export const backendPort = 3011
export const localStorageKey = 'flat-rent-db'

export class FlatRentSdk {
    constructor() {
        localStorage.setItem('flat-rent-db', `${JSON.stringify(database)}`)
        if (this._readDatabase() == null) {
            this._writeDatabase(database) 
        }

        this.database = this._readDatabase()
    }

    /**
     * Get flat by ID.
     * 
     * @param {string} id Flat ID.
     * @returns {Promise<Object|null>} Flat.
     */
    get(id) {
        const flat = this.database.find((item) => {
            return item.id === id
        })

        return Promise.resolve(flat == null ? flat : this._formatFlatObject(flat))
    }

    /**
     * Search for flats.
     * 
     * @param {Object} parameters Search parameters
     * @param {string}parameters.city City name
     * @param {Date} parameters.checkInDate Check-in date
     * @param {Date} parameters.checkOutDate Check-out date
     * @param {number} [parameters.priceLimit] Max price for a night
     * @returns {Object[]} List of suitable flats.
     */
    search(parameters) {
        return new Promise((resolve, reject) => {
            try {
                if (parameters.city != 'Санкт-Петербург') {
                    throw new Error(`Passed unsupported city - "${parameters.city}".`)
                }

                if (!(parameters.checkInDate instanceof Date) || !(parameters.checkOutDate instanceof Date)) {
                    throw new Error(`Passed invalid check-in or check-out date - from "${parameters.checkInDate}" to "${parameters.checkOutDate}".`)
                }
                this._assertDatesAreCorrect(parameters.checkInDate, parameters.checkOutDate)

                if (parameters.priceLimit != null && (isNaN(parameters.priceLimit) || !isFinite(parameters.priceLimit))) {
                    throw new Error(`Passed invalid price limit - "${parameters.priceLimit}".`)
                }
        
                let flats = this.database
        
                if (parameters.priceLimit != null) {
                    flats = flats.filter((flat) => {
                        return flat.price <= parameters.priceLimit
                    })
                }
        
                const dateRange = this._generateDateRange(parameters.checkInDate, parameters.checkOutDate)
                flats = flats.filter((flat) => {
                    return this._areAllDatesAvailable(flat, dateRange)
                })
        
                flats = flats.map((flat) => {
                   return this._formatFlatObject(flat, dateRange.length - 1)
                })

                resolve(flats)
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Book flat.
     * 
     * @param {number} flatId 
     * @param {Date} checkInDate 
     * @param {Date} checkOutDate
     * @returns {number}
     */
    book(flatId, checkInDate, checkOutDate) {
        return new Promise((resolve, reject) => {
            try {
                const flat = this.database.find((item) => {
                    return item.id === flatId
                })
        
                if (flat == null) {
                    throw new Error('There is no flat with ID "' + flatId + '".')
                }
                this._assertDatesAreCorrect(checkInDate, checkOutDate)
        
                const datesToBook = this._generateDateRange(checkInDate, checkOutDate)
                if (!this._areAllDatesAvailable(flat, datesToBook)) {
                    throw new Error(`Flat ${flat.id} is not available for dates ${datesToBook.join(",")}.`)
                }
        
                const bookedDates = datesToBook.map((date) => {
                    return date.getTime()
                })
                flat.bookedDates.push(...bookedDates)
                for (let i = 0; i < this.database.length; i++) {
                    if (this.database[i].id === flat.id) {
                        this.database[i] = flat
                        break
                    }
                }
                this._writeDatabase(this.database)
        
                resolve(this._generateTransactionId())
            } catch (error) {
                reject(error)
            }
        })
    }

    _formatFlatObject(flat, nightNumber) {
        const formattedFlat = Object.assign({}, flat)

        formattedFlat.photos = formattedFlat.photos.map((photoUrl) => {
            return `http://localhost:${backendPort}/img/${photoUrl}`
        })

        if (nightNumber != null) {
            formattedFlat.totalPrice = nightNumber * formattedFlat.price
            delete formattedFlat.price
        }

        return formattedFlat
    }

    _readDatabase() {
        const data = window.localStorage.getItem(localStorageKey)

        if (data == null) {
            return JSON.parse(data)
        }

        return data
    }

    _writeDatabase(database) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(database))
    }

    _syncDatabase(database) {
        this._writeDatabase(database)
        this.database = this._readDatabase()
    }
}
