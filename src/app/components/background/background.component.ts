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
  //Creating an array of circles
  circleArray: Array<Object> = [];

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
    
    //store circles in array
    for ( var i = 0; i < 500; i++){
    //set variables
      const minRadius = 3;
      const radius = Math.random() * 5 + minRadius;
      const x = Math.random() * (innerWidth - radius * 2) + radius;
      const y = Math.random() * (innerHeight - radius * 2) + radius;
      const speed = 2;
      const dx = (Math.random() - 0.5) * speed;
      const dy = (Math.random() - 0.5) * speed;
      const color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
      //make circle
      //this.circleArray.push(new Circle(x, y, dx, dy, radius, speed, color));
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, Math.PI * 2, false);
      this.context.strokeStyle = color;
      this.context.stroke();
      this.context.fillStyle = color;
      this.context.fill();
    }
  }

  animate(): void {}

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }
}

