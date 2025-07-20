const quotes = [
    "Hari ini adalah hari yang indah untuk belajar.",
    "Latihan mengetik bisa meningkatkan kecepatanmu.",
    "Jangan menyerah, teruslah berlatih",
    "Setiap usaha kecil akan menghasilkan sesuatu.",
    "Konsistensi adalah kunci kesuksesan."
];

let currentIndex = 0, startTime, totalMistakes = 0, totalChars = 0, totalTime = 0;

function setQuote() {
    $("#quote").text(quotes[currentIndex]);
    $("#input-area").val("").prop("disabled", false).focus();
}

function countMistakes(input, target) {
    let mistakes = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== target[i]) mistakes++;
    }
    return mistakes + Math.max(0, target.length - input.length);
}

// Cegah copy paste
$("#input-area").on("paste copy cut", function(e){
    e.preventDefault();
    alert("Copy, Paste, dan Cut tidak diperbolehkan!");
});

$(document).keydown(function(e) {
    if ((e.ctrlKey || e.metaKey) && ['c','v','x','a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        alert("Shortcut keyboard tidak diperbolehkan!");
    }

    // Enter = tombol next
    if (e.key === "Enter" && $("#next-btn").is(":visible")) {
        e.preventDefault();
        $("#next-btn").click();
    }
});

$("#start-btn").click(function() {
    currentIndex = 0; totalMistakes = 0; totalChars = 0; totalTime = 0;
    setQuote();
    $("#input-container").show();
    startTime = new Date().getTime();
    $("#stats").hide().html("");
    $(this).hide();
    $("#next-btn").show();
});

$("#next-btn").click(function() {
    const input = $("#input-area").val();
    const quote = quotes[currentIndex];
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    const mistakes = countMistakes(input, quote);

    totalMistakes += mistakes;
    totalChars += quote.length;
    totalTime += timeTaken;

    currentIndex++;

    if (currentIndex < quotes.length) {
        setQuote();
        startTime = new Date().getTime();
    } else {
        const avgAccuracy = Math.round(((totalChars - totalMistakes) / totalChars) * 100);
        $("#stats").html(`
            <h3>Catatan Akhir</h3>
            <p>Total Waktu: ${totalTime.toFixed(2)} detik</p>
            <p>Jumlah Salah Ketik: ${totalMistakes}</p>
            <p>Rata-rata Akurasi: ${avgAccuracy}%</p>
        `).show();
        $("#input-area").prop("disabled", true);
        $("#next-btn").hide();
        $("#reset-btn").show();
    }
});

$("#reset-btn").click(function() {
    $("#quote").text("Klik \"Mulai\" untuk memulai tes!");
    $("#input-container").hide();
    $("#input-area").val("").prop("disabled", true);
    $("#stats").hide().html("");
    $(this).hide();
    $("#start-btn").show();
});
