const filters ={
  'chrome': {
    class: 'effects__preview--chrome',
    filterOptions:{
      range: {
        min: 0,
        max: 1,
      },
      start:1,
      step: 0.1,
    },
  },
  'sepia': {
    class:'effects__preview--sepia',
    filterOptions:{
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  'marvin': {
    class:'effects__preview--marvin',
    filterOptions:{
      range: {
        min: 1,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  'phobos': {
    class:'effects__preview--phobos',
    filterOptions:{
      range: {
        min: 0,
        max: 3,
      },
      start:3,
      step: 0.1,
    },
  },
  'heat': {
    class:'effects__preview--heat',
    filterOptions:{
      range: {
        min: 1,
        max: 3,
      },
      start:3,
      step: 0.1,
    },
  },
  'none':{
    class:'effects__preview--none',
    filterOptions:{
      range: {
        min: 0,
        max: 10,
      },
      start:0,
      step: 0.1,
    }
  }
};

export {filters};
