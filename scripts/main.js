$(document).ready(function() {
	var $currentDisplay = $("#currentDisplay");
	var $chainDisplay = $("#chainDisplay");
	var $number = $("#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine, #decimal");
	var $negate = $("#negate");
	var $operation = $("#add, #subtract, #multiply, #divide, #equals");
	var $percent = $("#percent");
	var $clearEntry = $("#clearEntry");
	var $allClear = $("#allClear");

	var entry = "";
	var operator = "";
	var chain = "";
	var active = false;
	var total = 0;

	$number.on("click", function() {
		if (operator === "=") {
			entry = "";
			operator = "";
			active = false;
			total = 0;
		}
		entry += $(this).text();
		if (entry.length > 9) {
			$currentDisplay.text("0");
			$chainDisplay.text("DIGIT LIMIT");
			entry = "";
		} else {
			$currentDisplay.text(entry);
		}
	});

	$negate.on("click", function() {
		if (entry && operator !== "=") {
			entry = Number(entry) * -1;
			$currentDisplay.text(entry);
		} else {
			total *= -1;
			if (operator === "=") {
				chain += "negate(T) ";
			} else {
				chain += "negate(T) " + operator + " ";
			}
			$currentDisplay.text(total);
			$chainDisplay.text(chain);
		}
	});

	$operation.on("click", function() {
		if (active) {
			entry = Number(entry);
			switch (operator) {
				case "+":
					total += entry;
					break;
				case "-":
					total -= entry;
					break;
				case "x":
					total *= entry;
					break;
				case "\u00f7":
					total /= entry;
					break;
			}
		} else {
			total = Number(entry);
			active = true;
		}
		operator = $(this).text();
		if (operator === "=") {
			entry = total;
			chain = "";
		} else {
			if (chain[chain.length - 3] === "T" || chain[chain.length - 1] === "%") {
				chain += " " + operator + " ";
			} else {
				chain += entry + " " + operator + " ";
			}
			entry = "";
		}
		$currentDisplay.text(total);
		$chainDisplay.text(chain);
	});

	$percent.on("click", function() {
		if (chain && chain[chain.length - 3] !== "T") {
			entry = Number(entry);
			switch (operator) {
				case "+":
					total += total * (entry / 100);
					break;
				case "-":
					total -= total * (entry / 100);
					break;
				case "x":
					total *= total * (entry / 100);
					break;
				case "\u00f7":
					total /= total * (entry / 100);
					break;
			}
			chain += entry + "%";
			$currentDisplay.text(total);
			$chainDisplay.text(chain);
			entry = "";
		}
	});

	$clearEntry.on("click", function() {
		if (operator !== "=") {
			$currentDisplay.text("0");
			entry = "";
		}
	});

	$allClear.on("click", function() {
		$currentDisplay.text("0");
		$chainDisplay.text("");
		entry = "";
		operator = "";
		chain = "";
		active = false;
		total = 0;
	});
});
