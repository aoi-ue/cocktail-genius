export const sortByAlphabet = this.props.drinks.sort((a, b) => {
        var nameA = a.strDrink; // ignore upper and lowercase
        var nameB = b.strDrink; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
