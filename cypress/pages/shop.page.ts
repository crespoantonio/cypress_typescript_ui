
export class ShopPage {
    private inicialX:number = 0;
    private finalX:number = 300;
    navigationHome() { return cy.get('.woocommerce-breadcrumb a[href="https://practice.automationtesting.in"]'); }
    fromFilterPrice(){return cy.get('.price_slider>span:nth-child(2)', {log:false})}
    toFilterPrice(){return cy.get('.price_slider>span:nth-child(3)', {log:false})}
    filterButton(){return cy.get('.price_slider_amount > .button')}
    fromPriceLabel(){return cy.get('.from')}
    toPriceLabel(){return cy.get('.to')}
    priceProductsOnsale(){return cy.get('ins .woocommerce-Price-amount')}
    priceProductsNotOnSale(){return cy.get('.price>span')}

    clickHome(): void {
        this.navigationHome().click();
    }

    priceOfProductsMax(max:number):void{
        if(this.priceProductsOnsale()){
            this.priceProductsOnsale().each(($element, index)=>{
                expect(parseFloat($element.text().slice(1))).to.be.at.most(max)
            })              
        }
        if(this.priceProductsNotOnSale()){
            this.priceProductsNotOnSale().each(($element, index)=>{
                expect(parseFloat($element.text().slice(1))).to.be.at.most(max)
            })
        }
    }

    priceOfProductsMin(min:number):void{
        if(this.priceProductsOnsale()){
            this.priceProductsOnsale().each(($element, index)=>{
                expect(parseFloat($element.text().slice(1))).to.be.at.least(min);
            })
        }
        if(this.priceProductsNotOnSale()){
            this.priceProductsNotOnSale().each(($element, index)=>{
                expect(parseFloat($element.text().slice(1))).to.be.at.least(min);
            })
        }
    }

    priceOfProductsBetween(max:number, min:number):void{
        this.priceOfProductsMax(max);
        this.priceOfProductsMin(min);
    }

    selectPriceFrom(from:number):void{
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

    selectPriceTo(to:number):void{
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
