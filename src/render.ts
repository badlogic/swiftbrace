import {Bead} from "./beads.js"

export function drawCircle(ctx: CanvasRenderingContext2D, circleCenter: { x: number, y: number }, circleRadius: number) {
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    ctx.stroke();
}

export function drawBeads(ctx: CanvasRenderingContext2D, beads: Bead[]) {
    for (let i = 0; i < beads.length; i++) {
        const bead = beads[i];
        const body = bead.body;

        if (!body.render.visible) continue;

        for (let k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
            const part = body.parts[k];

            if (!part.render.visible) continue;

            ctx.save();
            ctx.translate(part.position.x, part.position.y);
            ctx.rotate(part.angle);

            if (part.circleRadius) {
                ctx.beginPath();
                ctx.arc(0, 0, part.circleRadius, 0, 2 * Math.PI);
                ctx.fillStyle = part.render.fillStyle ?? "#ffffff";
                ctx.fill();

                if (bead.letter !== "") {
                    ctx.fillStyle = "black";
                    ctx.font = `${part.circleRadius}px Arial`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(bead.letter, 0, 0);
                }
            } else {
                ctx.fillStyle = "red";
                ctx.fillRect(-20, -10, 40, 20);
            }

            ctx.restore();
        }
    }
}
