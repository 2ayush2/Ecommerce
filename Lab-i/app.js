const storeData = {
    categories: [
        { name: "Electronics", items: ["Smartphone", "Laptop", "Headphones"] },
        { name: "Clothing", items: ["T-shirt", "Jeans", "Jacket"] }
    ]
};

function updateUI() {
    const categoriesDiv = $('#categories').empty();
    const categorySelect = $('#categorySelect').empty();
    storeData.categories.forEach(category => {
        categoriesDiv.append(`
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${category.name}</h5>
                    <ul class="list-group list-group-flush">
                        ${category.items.map(item => `<li class="list-group-item">${item}</li>`).join('')}
                    </ul>
                </div>
            </div>`);
        categorySelect.append(`<option>${category.name}</option>`);
    });
}

$('#addCategoryForm').submit(function (e) {
    e.preventDefault();
    storeData.categories.push({ name: $('#newCategoryName').val(), items: [] });
    $('#newCategoryName').val('');
    updateUI();
});

$('#addItemForm').submit(function (e) {
    e.preventDefault();
    const category = storeData.categories.find(cat => cat.name === $('#categorySelect').val());
    category.items.push($('#newItemName').val());
    $('#newItemName').val('');
    updateUI();
});

updateUI();
