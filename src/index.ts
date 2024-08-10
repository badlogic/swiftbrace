import { Engine, World, Bodies, Mouse, MouseConstraint, Render, Runner, Body, Vector } from "matter-js";
import { drawBeads, drawCircle } from "./render.js";
import { generateBeads } from "./beads.js";

import Vara from "vara";

type Context = {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	engine: Engine;
	world: World;
	mouse: Mouse;
	mouseConstraint: MouseConstraint;
	scale: number;
	circleCenter: { x: number; y: number };
	circleRadius: number;
};

type Bead = { body: Matter.Body; attached: boolean; lastMousePosition: Vector | null; letter: string };

function setup() {
	const canvas = document.querySelector("canvas")!;
	const ctx = canvas.getContext("2d")!;
	const scale = window.devicePixelRatio || 1;
	canvas.width = canvas.clientWidth * scale;
	canvas.height = canvas.clientHeight * scale;
	ctx.scale(scale, scale);
	const engine = Engine.create();
	engine.gravity.y = 0.9;
	const world = engine.world;

	const maxWidth = 375;
	const boundsWidth = Math.min(canvas.clientWidth, maxWidth);
	const boundsHeight = canvas.clientHeight;
	const offsetX = (canvas.clientWidth - boundsWidth) / 2;
	const thickness = 50;
	const edges = [
		Bodies.rectangle(canvas.clientWidth / 2, -thickness / 2, boundsWidth, thickness, { isStatic: true }),
		Bodies.rectangle(canvas.clientWidth / 2, boundsHeight + thickness / 2 - 40, boundsWidth, thickness, {
			isStatic: true
		}),
		Bodies.rectangle(offsetX - thickness / 2, boundsHeight / 2, thickness, boundsHeight, { isStatic: true }),
		Bodies.rectangle(offsetX + boundsWidth + thickness / 2, boundsHeight / 2, thickness, boundsHeight, {
			isStatic: true
		})
	];
	World.add(world, edges);

	const mouse = Mouse.create(canvas);
	mouse.pixelRatio = scale;
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: true
			}
		}
	});
	World.add(world, mouseConstraint);

	const padding = 30;
	const circleCenter = { x: canvas.clientWidth / 2, y: padding + canvas.clientHeight / 4 };
	const circleRadius = 135;

	const renderer = Render.create({
		canvas: canvas,
		engine: engine,
		options: {
			width: canvas.clientWidth,
			height: canvas.clientHeight,
			background: "red",
			pixelRatio: scale
		}
	});

	const runner = Runner.create();
	Runner.run(runner, engine);

	return {
		canvas,
		ctx,
		engine,
		world,
		mouse,
		mouseConstraint,
		renderer,
		scale,
		circleCenter,
		circleRadius
	} as Context;
}

function getClosestPointOnCircle(g: Context, point: Vector) {
	const angle = Math.atan2(point.y - g.circleCenter.y, point.x - g.circleCenter.x);
	const closestPoint = {
		x: g.circleCenter.x + g.circleRadius * Math.cos(angle),
		y: g.circleCenter.y + g.circleRadius * Math.sin(angle)
	};
	const minDistance = Vector.magnitude(Vector.sub(point, closestPoint));
	return { closestPoint, minDistance };
}

function start() {
	const g = setup();
	const { beads, song } = generateBeads(g.canvas, g.world);
	document.querySelector("#refresh")!.addEventListener("click", () => {
		location.reload();
	});

	function animateLines() {
		const container = document.getElementById("vara-container")!;
		container.innerHTML = "";

		const line = song.lines[Math.floor(Math.random() * song.lines.length)];
		const x = Math.random() * 100;
		const y = container.clientHeight / 2 + Math.random() * 100;

		const vara = new Vara(
			"#vara-container",
			"./font.json",
			[
				{
					text: line,
					x,
					y
				}
			],
			{
				strokeWidth: 2,
				fontSize: 20,
				color: "rgba(204, 204, 204, 0.8)"
			}
		);
	}

	animateLines();
	setInterval(animateLines, 5000);

	function loop() {
		beads.forEach(({ body, attached, lastMousePosition }, index) => {
			const isBeingDragged = g.mouseConstraint.body === body;
			const mousePosition = g.mouse.position;

			if (isBeingDragged) {
				if (lastMousePosition) {
					const mouseMoveDistance = Vector.magnitude(Vector.sub(mousePosition, lastMousePosition));
					if (mouseMoveDistance > 30) {
						beads[index].attached = false;
					}
				}
				beads[index].lastMousePosition = { ...mousePosition };
			}
			const { closestPoint, minDistance } = getClosestPointOnCircle(g, body.position);

			if (isBeingDragged || attached) {
				if (minDistance < 30 && beads[index].attached) {
					const angle =
						Math.atan2(closestPoint.y - g.circleCenter.y, closestPoint.x - g.circleCenter.x) + Math.PI / 2;
					Body.setPosition(body, closestPoint);
					Body.setVelocity(body, { x: 0, y: 0 });
					Body.setAngle(body, angle + Math.PI);
					const gravityForce = { x: 0, y: 0.001 };
					Body.applyForce(body, body.position, gravityForce);
				} else if (minDistance < 30) {
					const angle =
						Math.atan2(closestPoint.y - g.circleCenter.y, closestPoint.x - g.circleCenter.x) + Math.PI / 2;
					Body.setPosition(body, closestPoint);
					Body.setVelocity(body, { x: 0, y: 0 });
					Body.setAngle(body, angle + Math.PI);
					const gravityForce = { x: 0, y: 0.001 };
					Body.applyForce(body, body.position, gravityForce);
					beads[index].attached = true;
				}
			}

			if (!isBeingDragged) {
				beads[index].lastMousePosition = null;
			}
		});

		let attached = beads.filter((b) => b.attached);
		if (attached.length >= 21) {
			attached = attached.filter((b) => b.letter != "");
			const title = song.title.replace(/\s+/g, "").toUpperCase();
			const calculateAngle = (bead: Bead) => {
				const dx = bead.body.position.x - g.circleCenter.x;
				const dy = bead.body.position.y - g.circleCenter.y;
				return Math.atan2(dy, dx);
			};
			attached.sort((a, b) => calculateAngle(a) - calculateAngle(b)).reverse();
			const attachedLetters = attached.map((b) => b.letter).join("");
			if (attachedLetters === title) {
				document.getElementById("header")?.classList.add("correct");
			}
		}

		const ctx = g.ctx;
		ctx.save();
		ctx.scale(g.scale, g.scale);
		ctx.clearRect(0, 0, g.canvas.clientWidth, g.canvas.clientHeight);

		drawCircle(ctx, g.circleCenter, g.circleRadius);
		drawBeads(ctx, beads);

		ctx.restore();
		requestAnimationFrame(loop);
	}
	loop();
}

document.addEventListener("DOMContentLoaded", start);

