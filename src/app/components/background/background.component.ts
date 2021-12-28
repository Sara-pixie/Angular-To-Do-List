import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})

export class BackgroundComponent implements OnInit, AfterViewInit {
  innerWidth!: number;
  innerHeight!: number;
  resizeObservable$!: Observable<Event>;  
  resizeSubscription$!: Subscription;
  @ViewChild("myCanvas") canvasRef!: ElementRef;
  private context!: CanvasRenderingContext2D;
  colorArray:Array<string> = [
    "#FFF587", "#FF8C64", "#FF665A", "#7D6B7D", "#A3A1A8"
  ]
  circleNumber: number = 500;
  //Creating an array of circles
  circleArray: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    //console.log("Width: ", this.innerWidth, " Height: ", this.innerHeight);
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( (event: any) => {
      this.innerWidth = event.target.innerWidth;
      this.innerHeight = event.target.innerHeight;
      //console.log("Width: ", this.innerWidth, " Height: ", this.innerHeight);
      window.location.reload(); //This is a quick fix and another solution should be found!
    })
  }

  ngAfterViewInit(): void {
    this.context = this.canvasRef.nativeElement.getContext("2d")!;
    //make circles
    for ( var i = 0; i < this.circleNumber; i++){
    //set variables
      const minRadius = 3;
      const radius = Math.random() * 5 + minRadius;
      const x = Math.random() * (innerWidth - radius * 2) + radius;
      const y = Math.random() * (innerHeight - radius * 2) + radius;
      const speed = 2;
      const dx = (Math.random() - 0.5) * speed;
      const dy = (Math.random() - 0.5) * speed;
      const color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
      //draw circle
      this.init(x, y, dx, dy, radius, speed, color);
    }
    //console.log(this.circleArray);
    this.animate();
  }

  private init(x: number, y: number, dx: number, dy: number, radius: number, speed: number, color: string){
      const circle = {x, y, dx, dy, radius, speed, color};
      this.circleArray.push(circle);
    this.draw(x, y, dx, dy, radius, speed, color);
  }

  private draw(x: number, y: number, dx: number, dy: number, radius: number, speed: number, color: string){
    this.context.beginPath();
      this.context.arc(x, y, radius, 0, Math.PI * 2, false);
      this.context.strokeStyle = color;
      this.context.stroke();
      this.context.fillStyle = color;
      this.context.fill();
  }

  private update(circle: any){
    //change directions when...
    if (circle.x + circle.radius > this.innerWidth || circle.x - circle.radius < 0) {
        circle.dx = -circle.dx;
    }
    if (circle.y + circle.radius > this.innerHeight || circle.y - circle.radius < 0) {
        circle.dy = -circle.dy;
    }
    //make it move by changing x & y values for the next circle
    circle.x += circle.dx;
    circle.y += circle.dy;
    this.draw(circle.x, circle.y, circle.dx, circle.dy, circle.radius, circle.speed, circle.color);
  }

  private animate(){
    //make a loop
    requestAnimationFrame(() => this.animate());
    //clear previous input
    this.context.clearRect(0, 0, this.innerWidth, this.innerHeight);
    //draw circles
    for (var i = 0; i < this.circleArray.length; i++){
        this.update(this.circleArray[i]);
    }
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }
}

