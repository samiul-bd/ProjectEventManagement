function modifySvg() {
    const rect = document.getElementById('access-rect');
    const currentWidth = parseFloat(rect.getAttribute('width'));
    rect.setAttribute('width', currentWidth + 20);
    rect.setAttribute('height', currentWidth + 20);
}

function createBarChart() {
    const data = [56, 99, 14, 12, 46, 33, 22, 100, 87, 6, 55, 44, 27, 28, 34];
    const height = 250;
    const barWidth = 20;
    
    d3.select("#d3-chart").selectAll("*").remove();
    
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, height]);
    
    const svg = d3.select("#d3-chart")
        .append("svg")
        .attr("width", data.length * (barWidth + 5))
        .attr("height", height + 30);
    
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "#008b8b")
        .attr("x", function(d, i) {
            return i * (barWidth + 5);
        })
        .attr("y", function(d) {
            return height - xScale(d);
        })
        .attr("width", barWidth)
        .attr("height", xScale);
}

function drawOnCanvas() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(10, 10, 100, 100);
    
    const embeddedCanvas = document.getElementById('embeddedCanvas');
    const embCtx = embeddedCanvas.getContext('2d');
    embCtx.fillStyle = '#ff0000';
    embCtx.fillRect(10, 10, 80, 80);
}

function setupAudioEvents() {
    const audio = document.getElementById('audio-player');
    const infoDiv = document.getElementById('audio-info');
    
    audio.addEventListener('play', function() {
        infoDiv.textContent = 'Audio started playing';
    });
    
    audio.addEventListener('ended', function() {
        infoDiv.textContent = 'Audio finished playing';
    });
    
    audio.addEventListener('pause', function() {
        infoDiv.textContent = 'Audio paused';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-player');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const timeDisplay = document.getElementById('video-time');
    
    playBtn.addEventListener('click', function() {
        video.play();
    });
    
    pauseBtn.addEventListener('click', function() {
        video.pause();
    });
    
    stopBtn.addEventListener('click', function() {
        video.pause();
        video.currentTime = 0;
    });
    
    video.addEventListener('timeupdate', function() {
        timeDisplay.textContent = `Time: ${Math.round(video.currentTime)}s`;
    });
});