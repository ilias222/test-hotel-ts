// Генератор даты, формата гггг-мм-дд

export function getData (interval:string):string {
        const data = new Date();
        const dataEndDay = new Date(data.getFullYear(), data.getMonth()+2, 0)
        let dataRezult = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`
        let dataFull = `${dataEndDay.getFullYear()}-${dataEndDay.getMonth()+1}-${dataEndDay.getDate()}`
    
        if(data.getMonth() <= 9){
        dataRezult = `${data.getFullYear()}-0${data.getMonth()+1}-${data.getDate()}`
        dataFull = `${dataEndDay.getFullYear()}-0${dataEndDay.getMonth()+1}-${dataEndDay.getDate()}`
        }

        if(data.getDate() <= 9){
        dataRezult = `${data.getFullYear()}-${data.getMonth()+1}-0${data.getDate()}`
        dataFull = `${dataEndDay.getFullYear()}-${dataEndDay.getMonth()+1}-0${dataEndDay.getDate()}`
        }

        if(data.getDate() <= 9 && data.getMonth() <= 9){
        dataRezult = `${data.getFullYear()}-0${data.getMonth()+1}-0${data.getDate()}`
        dataFull = `${dataEndDay.getFullYear()}-0${dataEndDay.getMonth()+1}-0${dataEndDay.getDate()}`
        }

        switch (interval) {
        case 'value':
            return dataRezult
        case 'min':
            return dataRezult
        case 'max':
            return dataFull
        default:
            return `${data}`
        }
  }