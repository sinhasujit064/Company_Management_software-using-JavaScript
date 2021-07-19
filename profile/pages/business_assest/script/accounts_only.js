// showing profile picture
function show_profile_pic(){
		var pic_box = document.getElementById("pic-box");
		var image_name = localStorage.getItem(sessionStorage.getItem("user_mail")+"image_url");
		pic_box.style.background="url("+image_name+")";
		pic_box.style.backgroundRepeat="no-repeat";
		pic_box.style.backgroundSize="cover";
}

show_profile_pic();

// showing company logo

function show_company_logo(){
	var logo = document.getElementById("brand");
	logo.style.backgroundImage="url("+localStorage.getItem("company-logo")+")";
	logo.style.backgroundSize="cover";
	var cmp_name = document.getElementById("brand-name");
	var string = localStorage.getItem("company");
	var company_details = JSON.parse(string);
	cmp_name.innerHTML = company_details.cmp_name;

}

show_company_logo();

// set unit of measure
function unit_of_measure()
{
	var unit_btn = document.getElementById("unit-of-measure");
	var pri_con = document.getElementById("primary-content");
	var sec_con = document.getElementById("secondary-content");
	var close = document.getElementById("close-icon");
	var form = document.getElementById("unit-form");
	unit_btn.onclick = function demo(){

		this.style.webkitTransform = "rotateX(180deg)";
		this.style.transform = "rotateX(180deg)";
		this.style.webkitTransition = "1s";
		this.style.transition = "1s";
		pri_con.style.display = "none";
		unit_btn.style.height = "auto";

		setTimeout(function(){
			sec_con.style.display = "block";
			sec_con.style.webkitTransform = "rotateX(-180deg)";
			sec_con.style.transform = "rotateX(-180deg)";
			unit_btn.style.height = "auto";

			close.onclick = function(){
				unit_btn.className = "animated flipInX";
				unit_btn.innerHTML = "<i class='fa fa-balance-scale' style='font-size:25px;float:left'></i> &nbspUnit of measure";
				
			}

			form.onsubmit = function(){
				var input = sec_con.getElementsByTagName("INPUT");
				var symbol = input[0].value;
				var formal_name = input[1].value;
				var unit_object = {symbol:symbol,formal_name:formal_name};
				var unit_details = JSON.stringify(unit_object);
				localStorage.setItem("unit_of_measure_"+symbol,unit_details);
			}

		},500);	
	
	}
}


unit_of_measure();

// sales voucher
function sales_voucher(){
	var sales_btn = document.getElementById("sales-btn");
	var sales_voucher = document.getElementById("sales-voucher");
	sales_btn.onclick = function(){
		sales_voucher.style.display = "block";
		sales_voucher.className = "animated slideInDown";
		var tax_display = document.getElementById("tax-col");
		var i;
		for(i=0;i<localStorage.length;i++)
		{
			var tax_name = localStorage.key(i);
			if(tax_name.indexOf("tax")!=-1)
			{	
				var tax_item = localStorage.getItem(tax_name);
				var extract = JSON.parse(tax_item);
				tax_display.innerHTML += extract.name_of_tax+" ("+extract.tax_qty+")<br>";
				document.getElementById("tax-calculation").innerHTML += "<i class='fa fa-rupee'></i> 0.00<br>";
			} 
		}
		
	}
}

sales_voucher();

// close voucher
function close_voucher(){
	var close_btn = document.getElementById("voucher-close");
	var sales_voucher = document.getElementById("sales-voucher");
	close_btn.onclick = function(){
		sales_voucher.className = "animated slideOutUp";
	}
}

close_voucher();

// showing voucher details and logo
function voucher_logo_details(){
	var voucher_logo = document.getElementById("voucher-logo");
	voucher_logo.style.background = "url("+localStorage.getItem("company-logo")+")";
	voucher_logo.style.backgroundSize = "cover";
	var voucher_details = document.getElementById("voucher-details");
	var string = localStorage.getItem("company");
	var company_details = JSON.parse(string);
	voucher_details.innerHTML = "<div style='font-size:35px;text-transform:capitalize;font-family:Righteous;font-weight:bold'>"+company_details.cmp_name+"</div><address style='margin-bottom:5px;margin-left:2px;font-size:18px'> venue : "+company_details.address+"</address>"+"call : "+company_details.phone;
}

voucher_logo_details();

// adding item
function add_item(){
	var product_table = document.getElementById("product-table");
	var tr = document.createElement("TR");
	var td_item = document.createElement("TD");
	var td_price = document.createElement("TD");
	var td_qty= document.createElement("TD");
	var td_amount = document.createElement("TD");
	var td_delete = document.createElement("TD");
	var input_item = document.createElement("INPUT");
	input_item.type = "text";
	input_item.className = "item";
	input_item.placeholder = "Item Description";
	var input_price = document.createElement("INPUT");
	input_price.type = "number";
	input_price.disabled = true;
		input_price.placeholder = "0.00";
		var input_qty = document.createElement("INPUT");
		input_qty.type = "number";
		input_qty.disabled = true;
		input_qty.placeholder = "1";
		var input_amount = document.createElement("INPUT");
		input_amount.type = "number";
		input_amount.placeholder = "0.00";
		input_amount.className = "amount";
		var del_icon = document.createElement("I");
		del_icon.className = "fa fa-trash";
		del_icon.id = "delete-row";
		product_table.append(tr);
		tr.append(td_item);
		tr.append(td_price);
		tr.append(td_qty);
		tr.append(td_amount);
		tr.append(td_delete);
		td_item.append(input_item);
		td_price.append(input_price);
		td_qty.append(input_qty);
		td_amount.append(input_amount);
		td_delete.append(del_icon);
		td_delete.align = "center";
		del_icon.onclick = function(){
			var del_icon_td = this.parentElement;
			var remove_element = del_icon_td.parentElement;
			remove_element.remove();
		}

		input_amount.onkeydown = function(){
			return false;
		}

		input_amount.oncontextmenu = function(){
			return false;	
		}

		input_item.oninput = function(){
			input_price.disabled = false;
			input_price.oninput = function(){
				input_qty.disabled = false;
				input_qty.oninput = function(){
					input_amount.value = input_price.value*input_qty.value;
					var amount_input = document.getElementsByClassName("amount");
					var i;
					var previous_amount = 0;
					for(i=0;i<amount_input.length;i++)
					{
						previous_amount = previous_amount + Number(amount_input[i].value);
						document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+previous_amount;
					}

					this.onkeyup = function(event){
						if(event.keyCode == 13)
						{
							document.getElementById("add-product").click();
							var items = document.getElementsByClassName("item");
							items[items.length-1].focus();

						}
					}





				}
			}
		}
}


function adding_item(){
	document.getElementById("add-product").onclick = function()
	{
		add_item();
	}
}

adding_item();

// tax setup
function tax_setup(){
	var tax_btn = document.getElementById("tax-btn");
	var tax_link = document.getElementById("tax-link");
	var tax_form = document.getElementById("tax-form");
	tax_link.onclick = function(){
		if(tax_btn.offsetHeight == 65)
		{
		tax_btn.style.height = "250px";
		tax_btn.style.webkitTransition = "0.5s";
		tax_btn.style.transition = "0.5s";
		}

		else{
			tax_btn.style.height = "65px";
			tax_btn.style.webkitTransition = "0.5s";
			tax_btn.style.transition = "0.5s";
		}

	var tax_name = document.getElementById("tax-name");
	var tax = document.getElementById("tax");
	tax_name.onchange = function(){
		if(this.value.indexOf("tax") != -1)
		{
			tax.oninput = function(){
				if(tax.value.charAt(0).indexOf("%") == -1)
				{
					document.getElementById("tax-form").onsubmit = function(){
						if(tax.value.indexOf("%") != -1)
						{
							var regexp = /[a-z!=@#+$_^&*({;:"'|\][?/<,.>})-]/i;
							var check = tax.value.match(regexp);
							if(check == null)
							{
								var name_of_tax = document.getElementById("tax-name").value;
								var tax_qty = tax.value;
								var tax_details = {name_of_tax:name_of_tax,tax_qty:tax_qty};
								var tax_string = JSON.stringify(tax_details);
								localStorage.setItem(name_of_tax,tax_string);
							}

							else{
								alert("Only 0 to 9 and % symbol allowed in tax field");
								return false;
							}
						}

						else{
							alert("Must add % symbol in tax field");
							return false;
						}
					}
				}

				else{
					tax.className = "animated infinite pulse";
					tax.value = "% not allowed at first place";
					tax.style.color = "red";
					tax.style.borderColor = "red";
					tax.onclick = function(){
					tax.className = "";
					tax.value = "";
					tax.style.color = "";
					tax.style.borderColor = "";
					}
				}
			}
		}

		else{
			this.className = "animated infinite pulse";
			this.value = "must add tax word";
			this.style.color = "red";
			this.style.borderColor = "red";
			this.onclick = function(){
			this.className = "";
			this.value = "";
			this.style.color = "";
			this.style.borderColor = "";
			}
		}
	}
	}
}

tax_setup();

// showing date
function showing_date(){
	var date = new Date();
	var current_date = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	document.getElementById("date").innerHTML += current_date+"/"+month+1+"/"+year;
}

showing_date();