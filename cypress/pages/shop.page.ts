export class ShopPage {
    private inicialX:number = 0;
    private finalX:number = 300;
    private productsOnSaleLocator = 'ins .woocommerce-Price-amount'
    private productsNotOnSaleLocator = '.price>span'
    navigationHome() {return cy.get('.woocommerce-breadcrumb a[href="https://practice.automationtesting.in"]'); }
    fromFilterPrice(){return cy.get('.price_slider>span:nth-child(2)', {log:false})}
    toFilterPrice(){return cy.get('.price_slider>span:nth-child(3)', {log:false})}
    filterButton(){return cy.get('.price_slider_amount > .button')}
    fromPriceLabel(){return cy.get('.from')}
    toPriceLabel(){return cy.get('.to')}
    priceProductsOnsale(){ return cy.get(this.productsOnSaleLocator)}
    priceProductsNotOnSale(){return cy.get(this.productsNotOnSaleLocator)}

    clickHome(): void {
        this.navigationHome().click();
    }

    private assertPricesInRange(elements: Cypress.Chainable, min: number, max: number): void {
        elements.each(($element, index) => {
            const price = parseFloat($element.text().slice(1));
            expect(price).to.be.at.least(min);
            expect(price).to.be.at.most(max);
        });
    }

    priceOfProductsInRange(min: number, max: number): void {
        cy.get('body').then(($body) => {
            const productsOnSaleExist = $body.find(this.productsOnSaleLocator).length > 0;
            const productsNotOnSaleExist = $body.find(this.productsNotOnSaleLocator).length > 0;
    
            if (productsOnSaleExist) {
                this.assertPricesInRange(this.priceProductsOnsale(), min, max);
            }
    
            if (productsNotOnSaleExist) {
                this.assertPricesInRange(this.priceProductsNotOnSale(), min, max);
            }
        });
    }    

    private selectPriceFrom(from:number):void{
        cy.get('.from',{log:false})
          .invoke({log:false}, 'text')
          .then((text: string) => {
            const fromSelected:number = parseFloat(text.slice(1));
            if (fromSelected < from) { 
              // Move the slider
              this.fromFilterPrice()
                .trigger('mousedown', { which: 1, pageX: 0, pageY: 0, log:false, force:true })
                .trigger('mousemove', { which: 1, pageX: this.inicialX, pageY: 0, log:false, force:true })
                .trigger('mouseup', {log: false, force:true});
  
              // Adjust the moveX for the next iteration
              this.inicialX = this.inicialX + 0.01;
  
              // Recursive call to moveSliderAndCheckPrice
              this.selectPriceFrom(from);
            }
        })
    }

    private selectPriceTo(to:number):void{
        cy.get('.to', {log:false})
          .invoke({log:false}, 'text')
          .then((text: string) => {
            const toSelected:number = parseFloat(text.slice(1));
            if (toSelected > to) { 
              // Move the slider
              this.toFilterPrice()
                .trigger('mousedown', { which: 1, pageX: 300, pageY: 0, log:false, force:true })
                .trigger('mousemove', { which: 1, pageX: this.finalX, pageY: 0, log:false, force:true })
                .trigger('mouseup', {log: false, force:true});
  
              // Adjust the moveX for the next iteration
              this.finalX = this.finalX - 0.01;
  
              // Recursive call to moveSliderAndCheckPrice
              this.selectPriceTo(to);
            }
        })
    }

    filterByPrice(from:number | null, to:number | null):void{
        if(from != null){
            this.selectPriceFrom(from);
        }
        if(to != null){
            this.selectPriceTo(to);
        }
    }

    clickFilterButton(){
        this.filterButton().click();
    }

}

export const shopPage = new ShopPage();
