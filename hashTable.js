class HashTable {
  constructor(size) {
    this.table = new Array(size);
    this.numbOfItems = 0;
  }

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const index = this.hash(key);
          if (newTable[index]) {
            newTable[index].push([key, value]);
          } else {
            newTable[index] = [[key, value]];
          }
        })
      }
    })
    this.table = newTable;
  }

  hash = (key, tableSize) => {
    let hashCode = 17;
    let primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % tableSize;
    }
    return hashCode;
  }

  setItem = (key, value) => {
    
    this.numbOfItems++;

    let loadFactor = this.numbOfItems / this.table.length;

    if (loadFactor > 0.8) {
      console.log('resize hapenning')
      this.resize();
    }
    
    let index = this.hash(key, this.table.length);
    if(this.table[index]) {
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [[key, value]];
    }
  }

  getItem = key => {
    let index = this.hash(key, this.table.length);
    
    if (!this.table[index]) {
      return null;
    } 

    return this.table[index].find(value => value[0] === key)[1];
  }

  has = key => {
    let index = this.hash(key, this.table.length);
    
    if (this.table[index]) {
      return this.table[index].some(value => value[0] === key);
    } else {
      return false;
    }
  }

  remove = key => {
    let index = this.hash(key, this.table.length);

    if (this.table[index]) {
      delete this.table[index];
      this.numbOfItems--;
      return true;
    } else {
      return false;
    }
  }

  length = () => {
    return this.table.length
  }

  clear = () => {
    this.table = new Array(this.table.length);
    this.numbOfItems = 0;
    return `The list has been reseted`
  }

  keys = () => {
    const keysArray = [];

   this.table.forEach((key) => {
    if (key) {
      key.forEach(([key]) => {
       keysArray.push(key)
      })
    }
   })

    return keysArray;
  }

  values = () => {
    const valuesArray = [];

    this.table.forEach((key) => {
      if (key) {
        key.forEach(([key, value]) => {
         valuesArray.push(value)
        })
      }
     })

    return valuesArray;
  }

  entries = () => {
    const entriesArray = [];

    this.table.forEach((key) => {
      if (key) {
        key.forEach(([key, value]) => {
         entriesArray.push([key, value])
        })
      }
     })

    return entriesArray;
  }
}

const table = new HashTable(17);
table.setItem('nombre','Oswaldo');
table.setItem('edad', 32);
table.setItem('profesion','Ingeniero');
table.setItem('genero','Masculino');
table.setItem('calidad','garantizada');
table.setItem('catolico', 'positivo');
table.setItem('deportista', 'positivo');
console.log(table)
console.log(table.keys())
console.log(table.values());
console.log(table.entries())