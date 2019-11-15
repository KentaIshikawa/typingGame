////////////////////////////////////////
//レコード
////////////////////////////////////////
var Rec = new Class();
Rec.extend({
	"type": "",
	"startTime": "",
	"endTime": "",
	"totalPoint": 0,
	"point": 5,
	"addPoint": function () {
		var st = this.startTime;
		var en = this.endTime;
		var re = en - st;
		if (re >= 3000 && re < 8000) {
			this.point = this.point - (Math.floor(re / 1000) - 3);
		} else if (re >= 8000) {
			this.point = 0;
		}
		this.totalPoint += this.point
		this.init();
	},
	"init": function () {
		this.startTime = "";
		this.endTime = "";
		this.point = 5;
	}
});

////////////////////////////////////////
//シーン1
////////////////////////////////////////
var seane1 = new Seane();
seane1.addClass("seane1");
seane1.set(function () {
	var obTitle = new Ob();
	obTitle.addClass("title");
	obTitle.html = "<span class='html'>HTML</span> <span class='and'>&</span> <span class='css'>CSS</span>";

	seane1.addChild(obTitle);

	var obSubTitle = new Ob();
	obSubTitle.addClass("subTitle");
	obSubTitle.html = Func.sAllWrapSpan("タイピングゲーム");
	seane1.addChild(obSubTitle);

	var btn = new Btn();
	btn.html = "<span>START</span>";
	btn.addClass("btnStart");
	btn.addEvent(btn.id, "click", function () {
		Stage.removeStage(seane1);
		Stage.addStage(seane2);
	});
	seane1.addChild(btn);

});




////////////////////////////////////////
//シーン2
////////////////////////////////////////
var seane2 = new Seane();
seane2.addClass("seane2");
seane2.added = function () {
	$(window).on("keydown.start", function (e) {
		if (e.keyCode == 32) {
			Stage.removeStage(seane2);
			Stage.addStage(seane3);
		}
		return false;
	});
}
seane2.removed = function () {
	$(window).off(".start");
}
seane2.set(function () {
	var ob1 = new Ob();
	ob1.addClass("ob1");
	ob1.html = "<i></i>キーボードを使います。<br>日本語入力は解除し、直接入力にして下さい。";
	seane2.addChild(ob1);

	var ob2 = new Ob();
	ob2.addClass("ob2");
	ob2.html = "HTMLタグ、HTML属性<br>CSSプロパティ、CSSの値から<br>よく使う物が、ランダムに20単語出題されます。<br>ローマ字入力でタイピングして下さい。";
	seane2.addChild(ob2);

	var ob3 = new Ob();
	ob3.addClass("ob3");
	ob3.html = "スペースキーを押すと始まります";
	seane2.addChild(ob3);

	var btn = new Btn();
	btn.html = "<span>タイトルへ戻る</span>";
	btn.addEvent(btn.id, "click", function () {
		Stage.removeStage(seane2);
		Stage.addStage(seane1);
	});
	btn.addClass("gotoTop");
	seane2.addChild(btn);
});







////////////////////////////////////////
//シーン3
////////////////////////////////////////
var seane3 = new Seane();
seane3.addClass("seane3");
seane3.added = function () {
	$(".ob1 span").hide();
	$(".ob1 span:nth-child(1)").fadeIn(1000, function () {
		$(this).hide();
		$(".ob1 span:nth-child(2)").fadeIn(1000, function () {
			$(this).hide();
			$(".ob1 span:nth-child(3)").fadeIn(1000, function () {
				$(this).hide();
				Stage.removeStage(seane3);
				Stage.addStage(seane4);
			});
		});
	});
};
seane3.set(function () {
	var ob1 = new Ob();
	ob1.addClass("ob1");
	ob1.html = Func.sAllWrapSpan("321");
	seane3.addChild(ob1);
});




////////////////////////////////////////
//シーン4
////////////////////////////////////////
var seane4 = new Seane();
seane4.addClass("seane4");
seane4.removed = function () {
	$(window).off();
}


seane4.set(function () {
	var ob1 = new Ob();
	ob1.addClass("ob1");
	ob1.addEvent(ob1.id, "type", function () {
		ob1.html = "残り" + typing.qText.length + "問です";
		$("#" + ob1.id).html(ob1.html);
	});
	ob1.html = "残り20問です";
	seane4.addChild(ob1);

	var typing = new TypingGameObject();
	typing.added = function () {
		typing.wordInit("all");
		typing.setWord();
		typing.callBackSelector = ob1.id
		$(window).keydown(function (e) {
			typing.typing(e);
		});
		$(window).on("over", function () {
			seane4.removeChild(ob1.id);
			setTimeout(function () {
				$("#" + seane4.id).fadeOut(1000, function () {
					Stage.removeStage(seane4);
					Stage.addStage(seane5);
				})
			}, 1500);
		})
	}
	seane4.addChild(typing);
});







////////////////////////////////////////
//シーン5
////////////////////////////////////////
var seane5 = new Seane();
seane5.addClass("seane5")
seane5.added = function () {
	$(".ob2 span").html(Rec.totalPoint + "点");
	var twurl = "https://twitter.com/intent/tweet?status=";
	twurl += encodeURIComponent("【" + document.title + "】今回の採点結果は、" + Rec.totalPoint + "点です。#html_typing_game " + "https://github.com/KentaIshikawa/typingGame");

	$(".btnTw").html("<a href=" + twurl + " target='_blank'><span>tweeterでつぶやく</span></a>");
}


seane5.removed = function () {
	Rec.totalPoint = 0;
}

seane5.set(function () {
	var btn = new Btn();
	btn.html = "<span>タイトルへ戻る</span>";
	btn.addEvent(btn.id, "click", function () {
		Stage.removeStage(seane5);
		Stage.addStage(seane1);
	});
	btn.addClass("gotoTop");
	seane5.addChild(btn);

	var btnRe = new Btn();
	btnRe.addClass("btnRe");
	btnRe.html = "<span>リトライ</span>"
	btnRe.addEvent(btnRe.id, "click", function () {
		Stage.removeStage(seane5);
		Stage.addStage(seane3);
	});
	seane5.addChild(btnRe);

	var btnTw = new Btn();
	btnTw.addClass("btnTw");
	seane5.addChild(btnTw);


	var ob1 = new Ob();
	ob1.addClass("ob1");
	ob1.html = "採点結果";
	seane5.addChild(ob1);

	var ob2 = new Ob();
	ob2.addClass("ob2");
	ob2.html = "今回の点数は、<span></span>です。";
	/*
	ob2.added = function(){
		$("#"+ob2.id+" span").html(Rec.totalPoint + "点");
	}
	*/
	seane5.addChild(ob2);
})

