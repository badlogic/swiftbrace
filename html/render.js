"use strict";
(() => {
  // src/render.ts
  function drawCircle(ctx, circleCenter, circleRadius) {
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  function drawBeads(ctx, beads) {
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
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3JlbmRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtCZWFkfSBmcm9tIFwiLi9iZWFkcy5qc1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3Q2lyY2xlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBjaXJjbGVDZW50ZXI6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSwgY2lyY2xlUmFkaXVzOiBudW1iZXIpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjaXJjbGVDZW50ZXIueCwgY2lyY2xlQ2VudGVyLnksIGNpcmNsZVJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2NjY1wiO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGN0eC5zdHJva2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdCZWFkcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgYmVhZHM6IEJlYWRbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmVhZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYmVhZCA9IGJlYWRzW2ldO1xuICAgICAgICBjb25zdCBib2R5ID0gYmVhZC5ib2R5O1xuXG4gICAgICAgIGlmICghYm9keS5yZW5kZXIudmlzaWJsZSkgY29udGludWU7XG5cbiAgICAgICAgZm9yIChsZXQgayA9IGJvZHkucGFydHMubGVuZ3RoID4gMSA/IDEgOiAwOyBrIDwgYm9keS5wYXJ0cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgY29uc3QgcGFydCA9IGJvZHkucGFydHNba107XG5cbiAgICAgICAgICAgIGlmICghcGFydC5yZW5kZXIudmlzaWJsZSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHBhcnQucG9zaXRpb24ueCwgcGFydC5wb3NpdGlvbi55KTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUocGFydC5hbmdsZSk7XG5cbiAgICAgICAgICAgIGlmIChwYXJ0LmNpcmNsZVJhZGl1cykge1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguYXJjKDAsIDAsIHBhcnQuY2lyY2xlUmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhcnQucmVuZGVyLmZpbGxTdHlsZSA/PyBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJlYWQubGV0dGVyICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gYCR7cGFydC5jaXJjbGVSYWRpdXN9cHggQXJpYWxgO1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChiZWFkLmxldHRlciwgMCwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoLTIwLCAtMTAsIDQwLCAyMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7QUFFTyxXQUFTLFdBQVcsS0FBK0IsY0FBd0MsY0FBc0I7QUFDcEgsUUFBSSxVQUFVO0FBQ2QsUUFBSSxJQUFJLGFBQWEsR0FBRyxhQUFhLEdBQUcsY0FBYyxHQUFHLElBQUksS0FBSyxFQUFFO0FBQ3BFLFFBQUksY0FBYztBQUNsQixRQUFJLFlBQVk7QUFDaEIsUUFBSSxPQUFPO0FBQUEsRUFDZjtBQUVPLFdBQVMsVUFBVSxLQUErQixPQUFlO0FBQ3BFLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDbkMsWUFBTSxPQUFPLE1BQU0sQ0FBQztBQUNwQixZQUFNLE9BQU8sS0FBSztBQUVsQixVQUFJLENBQUMsS0FBSyxPQUFPLFFBQVM7QUFFMUIsZUFBUyxJQUFJLEtBQUssTUFBTSxTQUFTLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxNQUFNLFFBQVEsS0FBSztBQUNwRSxjQUFNLE9BQU8sS0FBSyxNQUFNLENBQUM7QUFFekIsWUFBSSxDQUFDLEtBQUssT0FBTyxRQUFTO0FBRTFCLFlBQUksS0FBSztBQUNULFlBQUksVUFBVSxLQUFLLFNBQVMsR0FBRyxLQUFLLFNBQVMsQ0FBQztBQUM5QyxZQUFJLE9BQU8sS0FBSyxLQUFLO0FBRXJCLFlBQUksS0FBSyxjQUFjO0FBQ25CLGNBQUksVUFBVTtBQUNkLGNBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFDL0MsY0FBSSxZQUFZLEtBQUssT0FBTyxhQUFhO0FBQ3pDLGNBQUksS0FBSztBQUVULGNBQUksS0FBSyxXQUFXLElBQUk7QUFDcEIsZ0JBQUksWUFBWTtBQUNoQixnQkFBSSxPQUFPLEdBQUcsS0FBSyxZQUFZO0FBQy9CLGdCQUFJLFlBQVk7QUFDaEIsZ0JBQUksZUFBZTtBQUNuQixnQkFBSSxTQUFTLEtBQUssUUFBUSxHQUFHLENBQUM7QUFBQSxVQUNsQztBQUFBLFFBQ0osT0FBTztBQUNILGNBQUksWUFBWTtBQUNoQixjQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksRUFBRTtBQUFBLFFBQ2pDO0FBRUEsWUFBSSxRQUFRO0FBQUEsTUFDaEI7QUFBQSxJQUNKO0FBQUEsRUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
