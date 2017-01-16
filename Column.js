function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">X</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		var columnNameChange = $('<button class="column-name-change">Zmień nazwę kolumny</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();			
		});

        columnNameChange.click(function(event){
            event.preventDefault();
            var newName = prompt("Wpisz nową nazwę kolumny");
            if (newName === null) {
            	alert('Nie podano nowej nazwy kolumny. Spróbuj ponownie.');
            	return;
            }
            $.ajax({
        		url: baseUrl + '/column/' + self.id,
        		method: 'PUT',
        		data: {
            		id: self.id,
            		name: newName
        		},
       			success: function(response) {
       				self.name = newName;
       				self.id = response.id;
         		}
    		});
        });
	
		columnAddCard.click(function(event) {
			var cardName = prompt("Wpisz nazwę karty");
			if (cardName === null) {
				return;
			}	
			var level = prompt("Podaj priorytet: 1 - wysoki, 2 - średni, 3 - niski");
			if ( level !== '1' && level !== '2' && level !== '3') {
				alert('Nieprawidłowy priorytet. Spróbuj ponownie');
				return;
			};
			event.preventDefault();
			$.ajax({
        		url: baseUrl + '/card',
        		method: 'POST',
        		data: {
              		name: cardName,
    				bootcamp_kanban_column_id: self.id
        		},
        		success: function(response) {
            		var card = new Card(response.id, cardName, level);
        			self.createCard(card);
        		}
    		});
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					self.id = response.id;
					self.name = cardName;
				}
			});
		}); 
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList)
			.append(columnNameChange);
			return column;
	}
}



Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
    	var self = this;
    	$.ajax({
      		url: baseUrl + '/column/' + self.id,
      		method: 'DELETE',
      		success: function(response){
        		self.element.remove();
      		}
   		});
 	}
};