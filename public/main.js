(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/user.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/user.guard.ts ***!
  \***************************************/
/*! exports provided: UserGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserGuard", function() { return UserGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UserGuard = /** @class */ (function () {
    function UserGuard() {
    }
    UserGuard.prototype.canActivate = function (next, state) {
        return localStorage.getItem('token').length > 0;
    };
    UserGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], UserGuard);
    return UserGuard;
}());



/***/ }),

/***/ "./src/app/_models/you-tube-media.ts":
/*!*******************************************!*\
  !*** ./src/app/_models/you-tube-media.ts ***!
  \*******************************************/
/*! exports provided: YouTubeMedia */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouTubeMedia", function() { return YouTubeMedia; });
var YouTubeMedia = /** @class */ (function () {
    function YouTubeMedia() {
    }
    return YouTubeMedia;
}());



/***/ }),

/***/ "./src/app/_services/you-tube-media.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/_services/you-tube-media.service.ts ***!
  \*****************************************************/
/*! exports provided: YouTubeMediaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouTubeMediaService", function() { return YouTubeMediaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YouTubeMediaService = /** @class */ (function () {
    function YouTubeMediaService(http) {
        this.http = http;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
    }
    YouTubeMediaService.prototype.ngOnInit = function () {
    };
    YouTubeMediaService.prototype.search = function (query) {
        var _this = this;
        this.last = query;
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/api/v1/youtube/search", {
            params: {
                q: query
            }
        }).toPromise().then(function (result) {
            var videoIds = result.items.reduce(function (prev, curr) {
                prev.push(curr.id.videoId);
                return prev;
            }, []);
            return _this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/api/v1/youtube/duration", {
                params: {
                    videos: videoIds
                }
            }).toPromise();
        }).then(function (result) {
            if (_this.last === query) {
                _this.subject.next(result.items);
            }
        }).catch(function (err) {
            console.log("[YouTubeService] " + err);
            _this.subject.error(err);
        });
        return this.subject;
    };
    YouTubeMediaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], YouTubeMediaService);
    return YouTubeMediaService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _manage_manage_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manage/manage.component */ "./src/app/manage/manage.component.ts");
/* harmony import */ var _station_station_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./station/station.component */ "./src/app/station/station.component.ts");
/* harmony import */ var _mobile_mobile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mobile/mobile.component */ "./src/app/mobile/mobile.component.ts");
/* harmony import */ var _landing_landing_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./landing/landing.component */ "./src/app/landing/landing.component.ts");
/* harmony import */ var _guards_user_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_guards/user.guard */ "./src/app/_guards/user.guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: _landing_landing_component__WEBPACK_IMPORTED_MODULE_6__["LandingComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'users/:userid/:username', component: _manage_manage_component__WEBPACK_IMPORTED_MODULE_3__["ManageComponent"], canActivate: [_guards_user_guard__WEBPACK_IMPORTED_MODULE_7__["UserGuard"]] },
    { path: 'users/:userid/:username/:list', component: _manage_manage_component__WEBPACK_IMPORTED_MODULE_3__["ManageComponent"], canActivate: [_guards_user_guard__WEBPACK_IMPORTED_MODULE_7__["UserGuard"]] },
    { path: 'radios/:radio/live', component: _mobile_mobile_component__WEBPACK_IMPORTED_MODULE_5__["MobileComponent"] },
    { path: 'radios/:radio', component: _station_station_component__WEBPACK_IMPORTED_MODULE_4__["StationComponent"] },
    { path: '**', component: _landing_landing_component__WEBPACK_IMPORTED_MODULE_6__["LandingComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n<a href='https://www.freepik.com/free-vector/abstract-dark-halftone-background-design_3123490.htm'>Background Designed\n  by Starline</a>\n"

/***/ }),

/***/ "./src/app/app.component.sass":
/*!************************************!*\
  !*** ./src/app/app.component.sass ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'PeopleRadio';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.sass */ "./src/app/app.component.sass")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _station_station_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./station/station.component */ "./src/app/station/station.component.ts");
/* harmony import */ var _manage_manage_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./manage/manage.component */ "./src/app/manage/manage.component.ts");
/* harmony import */ var _you_tube_media_you_tube_media_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./you-tube-media/you-tube-media.component */ "./src/app/you-tube-media/you-tube-media.component.ts");
/* harmony import */ var _management_list_management_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./management-list/management-list.component */ "./src/app/management-list/management-list.component.ts");
/* harmony import */ var _mobile_mobile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mobile/mobile.component */ "./src/app/mobile/mobile.component.ts");
/* harmony import */ var _landing_landing_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./landing/landing.component */ "./src/app/landing/landing.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _station_station_component__WEBPACK_IMPORTED_MODULE_6__["StationComponent"],
                _manage_manage_component__WEBPACK_IMPORTED_MODULE_7__["ManageComponent"],
                _you_tube_media_you_tube_media_component__WEBPACK_IMPORTED_MODULE_8__["YouTubeMediaComponent"],
                _management_list_management_list_component__WEBPACK_IMPORTED_MODULE_9__["ManagementListComponent"],
                _mobile_mobile_component__WEBPACK_IMPORTED_MODULE_10__["MobileComponent"],
                _landing_landing_component__WEBPACK_IMPORTED_MODULE_11__["LandingComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__["FlexLayoutModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"],
                // Angular Material Imports
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/landing/landing.component.html":
/*!************************************************!*\
  !*** ./src/app/landing/landing.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start stretch\" style=\"min-height: 100%; padding-left: 16px; padding-right: 16px;\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-around end\" style=\"padding-top: 200px\">\n    <mat-card fxFlex=\"80%\">\n      <mat-form-field style=\"width: 100%\">\n        <input matInput placeholder=\"Radio Name\" value=\"\">\n        <mat-icon matSuffix>search</mat-icon>\n      </mat-form-field>\n    </mat-card>\n  </div>\n  <div fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" style=\"min-height: 60%\">\n    <mat-card fxFlex=\"16%\" *ngFor=\"let station of stations\" style=\"margin: 8px 2%\">\n      <h3 (click)=\"select(station)\">{{station.title}}</h3>\n      <img [src]=\"station.image\" alt=\"channel image\" width=\"100%\" (click)=\"select(station)\">\n    </mat-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/landing/landing.component.sass":
/*!************************************************!*\
  !*** ./src/app/landing/landing.component.sass ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xhbmRpbmcvbGFuZGluZy5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/landing/landing.component.ts":
/*!**********************************************!*\
  !*** ./src/app/landing/landing.component.ts ***!
  \**********************************************/
/*! exports provided: LandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingComponent", function() { return LandingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LandingComponent = /** @class */ (function () {
    function LandingComponent(http, router) {
        this.http = http;
        this.router = router;
        this.stations = [];
    }
    LandingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiURL + "/api/v1/radios/").toPromise().then(function (result) {
            _this.stations = result['data'];
        });
    };
    LandingComponent.prototype.select = function (station) {
        this.router.navigateByUrl("/radios/" + station._id);
    };
    LandingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-landing',
            template: __webpack_require__(/*! ./landing.component.html */ "./src/app/landing/landing.component.html"),
            styles: [__webpack_require__(/*! ./landing.component.sass */ "./src/app/landing/landing.component.sass")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], LandingComponent);
    return LandingComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"space-around center\" style=\"width: 100%; height: 100%\">\n  <mat-card>\n    <h3>Login</h3>\n    <mat-divider>\n    </mat-divider>\n    <mat-card-content>\n      <mat-list>\n        <mat-list-item>\n          <mat-form-field>\n            <input matInput placeholder=\"Username\" value=\"\" [formControl]=\"usernameControl\">\n          </mat-form-field>\n          <mat-error *ngIf=\"loginerr\">\n            Username & password does not match\n          </mat-error>\n          <mat-error *ngIf=\"registererr\">\n            Username already in use\n          </mat-error>\n        </mat-list-item>\n        <mat-list-item>\n          <mat-form-field>\n            <input matInput placeholder=\"Password\" value=\"\" type=\"password\" [formControl]=\"passwordControl\">\n          </mat-form-field>\n        </mat-list-item>\n      </mat-list>\n    </mat-card-content>\n    <mat-card-actions>\n      <button mat-button (click)=\"login()\">Login</button>\n      <button mat-button (click)=\"register()\">Sign Up</button>\n    </mat-card-actions>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/login/login.component.sass":
/*!********************************************!*\
  !*** ./src/app/login/login.component.sass ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(http, router) {
        this.http = http;
        this.router = router;
        this.usernameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
        this.passwordControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
        this.loginerr = false;
        this.registererr = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/users/login", {
            username: this.usernameControl.value,
            password: this.passwordControl.value
        }).toPromise().then(function (result) {
            if (result['ok'] === true) {
                localStorage.setItem('token', Math.random().toString());
                _this.router.navigateByUrl("/users/" + result['data']._id + "/" + result['data'].username);
                _this.loginerr = false;
            }
            else {
                _this.loginerr = true;
            }
        });
    };
    LoginComponent.prototype.register = function () {
        var _this = this;
        this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/users/register", {
            username: this.usernameControl.value,
            password: this.passwordControl.value
        }).toPromise().then(function (result) {
            console.log(result);
            if (result['ok'] === true) {
                localStorage.setItem('token', Math.random().toString());
                _this.router.navigateByUrl("/users/" + result['data']._id + "/" + result['data'].username);
                _this.registererr = false;
            }
            else {
                _this.registererr = true;
            }
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.sass */ "./src/app/login/login.component.sass")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/manage/manage.component.html":
/*!**********************************************!*\
  !*** ./src/app/manage/manage.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n  <h3>{{username}}</h3>\n  <div style=\"flex: 1 1\">\n  </div>\n  <button mat-button (click)=\"queue()\">Queue</button>\n  <button mat-button (click)=\"approval()\">Approvals</button>\n  <button mat-button (click)=\"blacklist()\">Blacklist</button>\n  <button mat-button (click)=\"whitelist()\">Whitelist</button>\n</mat-toolbar>\n<div fxLayout=\"row wrap\" fxLayoutAlign=\"center start\" style=\"margin: 8px;\">\n  <mat-card style=\"width: 40%\">\n    <h3>{{title}}</h3>\n    <mat-divider>\n    </mat-divider>\n    <mat-list>\n      <ng-container *ngFor=\"let song of songs; let index\">\n        <mat-list-item *ngIf=\"!song.hidden\">\n          <span class=\"mat-body-strong\">{{song.title}}</span>\n          <div style=\"flex: 1 1\"></div>\n          <button mat-icon-button *ngFor=\"let button of buttons\">\n            <mat-icon (click)=\"button.click(song)\">{{button.icon}}</mat-icon>\n          </button>\n        </mat-list-item>\n      </ng-container>\n    </mat-list>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/manage/manage.component.sass":
/*!**********************************************!*\
  !*** ./src/app/manage/manage.component.sass ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZS9tYW5hZ2UuY29tcG9uZW50LnNhc3MifQ== */"

/***/ }),

/***/ "./src/app/manage/manage.component.ts":
/*!********************************************!*\
  !*** ./src/app/manage/manage.component.ts ***!
  \********************************************/
/*! exports provided: ManageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageComponent", function() { return ManageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ManageComponent = /** @class */ (function () {
    function ManageComponent(route, http) {
        this.route = route;
        this.http = http;
    }
    ManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.username = params['username'];
            _this.userid = params['userid'];
            _this.list = params['list'];
            _this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/users/" + _this.userid + "/streams").toPromise().then(function (result) {
                _this.stream = result['data'];
                _this.queue();
            });
        });
    };
    ManageComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.sub.unsubscribe();
    };
    ManageComponent.prototype.approval = function () {
        var _this = this;
        var f = function (song, action) {
            _this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + _this.stream._id + "/approval/" + song._id, { action: action })
                .toPromise()
                .then(function (result) {
                song['hidden'] = true;
            });
        };
        this.title = 'Approvals';
        this.buttons = [{
                icon: 'check', click: function (song) {
                    f(song, 'approve');
                }
            }, {
                icon: 'delete', click: function (song) {
                    f(song, 'delete');
                }
            }, {
                icon: 'delete_forever', click: function (song) {
                    f(song, 'blacklist');
                }
            }, {
                icon: 'favorite', click: function (song) {
                    f(song, 'whitelist');
                }
            }];
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + this.stream._id + "/approval").toPromise().then(function (result) {
            _this.songs = result['data'];
        });
    };
    ManageComponent.prototype.queue = function () {
        var _this = this;
        this.buttons = [{
                icon: 'delete', click: function (song) {
                    _this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + _this.stream._id + "/queue/" + song._id)
                        .toPromise()
                        .then(function (result) {
                        song['hidden'] = true;
                    });
                }
            }];
        this.title = 'Queue';
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + this.stream._id + "/queue").toPromise().then(function (result) {
            _this.songs = result['data'];
        });
    };
    ManageComponent.prototype.whitelist = function () {
        var _this = this;
        this.buttons = [{
                icon: 'delete', click: function (song) {
                    _this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + _this.stream._id + "/whitelist/" + song._id)
                        .toPromise()
                        .then(function (result) {
                        song['hidden'] = true;
                    });
                }
            }];
        this.title = 'Whitelist';
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + this.stream._id + "/whitelist").toPromise().then(function (result) {
            _this.songs = result['data'];
        });
    };
    ManageComponent.prototype.blacklist = function () {
        var _this = this;
        this.buttons = [{
                icon: 'delete', click: function (song) {
                    _this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + _this.stream._id + "/blacklist/" + song._id)
                        .toPromise()
                        .then(function (result) {
                        song['hidden'] = true;
                    });
                }
            }];
        this.title = 'Blacklist';
        this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiURL + "/api/v1/radios/" + this.stream._id + "/blacklist").toPromise().then(function (result) {
            _this.songs = result['data'];
        });
    };
    ManageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage',
            template: __webpack_require__(/*! ./manage.component.html */ "./src/app/manage/manage.component.html"),
            styles: [__webpack_require__(/*! ./manage.component.sass */ "./src/app/manage/manage.component.sass")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ManageComponent);
    return ManageComponent;
}());



/***/ }),

/***/ "./src/app/management-list/management-list.component.html":
/*!****************************************************************!*\
  !*** ./src/app/management-list/management-list.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card style=\"width: 40%\">\n  <h3>{{title}}</h3>\n  <mat-divider>\n  </mat-divider>\n  <mat-list>\n    <mat-list-item *ngFor=\"let song of songs\">\n      <span class=\"mat-body-strong\">{{song.title}}</span>\n      <div style=\"flex: 1 1\"></div>\n      <button mat-icon-button *ngFor=\"let button of buttons\">\n        <mat-icon>{{button.icon}}</mat-icon>\n      </button>\n    </mat-list-item>\n  </mat-list>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/management-list/management-list.component.sass":
/*!****************************************************************!*\
  !*** ./src/app/management-list/management-list.component.sass ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZW1lbnQtbGlzdC9tYW5hZ2VtZW50LWxpc3QuY29tcG9uZW50LnNhc3MifQ== */"

/***/ }),

/***/ "./src/app/management-list/management-list.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/management-list/management-list.component.ts ***!
  \**************************************************************/
/*! exports provided: ManagementListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagementListComponent", function() { return ManagementListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ManagementListComponent = /** @class */ (function () {
    function ManagementListComponent() {
        this.buttonPressed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ManagementListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ManagementListComponent.prototype, "buttons", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ManagementListComponent.prototype, "title", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ManagementListComponent.prototype, "sessionStorage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ManagementListComponent.prototype, "buttonPressed", void 0);
    ManagementListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-management-list',
            template: __webpack_require__(/*! ./management-list.component.html */ "./src/app/management-list/management-list.component.html"),
            styles: [__webpack_require__(/*! ./management-list.component.sass */ "./src/app/management-list/management-list.component.sass")]
        }),
        __metadata("design:paramtypes", [])
    ], ManagementListComponent);
    return ManagementListComponent;
}());



/***/ }),

/***/ "./src/app/mobile/mobile.component.html":
/*!**********************************************!*\
  !*** ./src/app/mobile/mobile.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"space-around center\" fxLayoutGap=\"16px\" style=\"width:100%; padding-top: 16px;\">\n  <mat-card fxLayout=\"column\" fxLayoutAlign=\"space-around center\">\n    <video #videoPlayer controls id=\"video-player\" width=\"300px\" height=\"300px\">\n      <source src=\"{{environment.apiURL}}/api/v1/radios/{{this.streamId}}/live.mpd\" type=\"application/dash+xml\">\n    </video>\n    <img [src]=\"playing.image\" alt=\"\">\n    <span class=\"mat-body-strong\">{{playing.title}}</span>\n    <div>\n      <button mat-icon-button (click)=\"play()\">\n        <mat-icon>play_arrow</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"stop()\">\n        <mat-icon>skip_next</mat-icon>\n      </button>\n      <button mat-icon-button (click)=\"quality()\">\n        {{currentQuality}}\n      </button>\n    </div>\n  </mat-card>\n  <mat-card>\n    <h3>Queue</h3>\n    <mat-list>\n      <mat-list-item *ngFor=\"let song of songs\">{{ song.title }}\n        <mat-divider>\n        </mat-divider>\n      </mat-list-item>\n    </mat-list>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/mobile/mobile.component.sass":
/*!**********************************************!*\
  !*** ./src/app/mobile/mobile.component.sass ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vYmlsZS9tb2JpbGUuY29tcG9uZW50LnNhc3MifQ== */"

/***/ }),

/***/ "./src/app/mobile/mobile.component.ts":
/*!********************************************!*\
  !*** ./src/app/mobile/mobile.component.ts ***!
  \********************************************/
/*! exports provided: MobileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileComponent", function() { return MobileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MobileComponent = /** @class */ (function () {
    function MobileComponent(http, activatedRoute) {
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.playing = { title: '', image: '' };
        this.songs = [];
        this.environment = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"];
    }
    MobileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.streamId = params['radio'];
            console.log(_this.streamId);
            // TODO does not work
            /*this.http.get(`${environment.apiURL}/api/v1/radios/${this.streamId}/live`).toPromise().then(result => {
              console.log(result);
              this.address = result['data']['address'];
              /*this.videoPlayer.nativeElement.src = result['data']['address'] + '/api/v1/encoder/live.mpd';
              this.videoPlayer.nativeElement.play()
            });*/
        });
    };
    MobileComponent.prototype.play = function () {
        this.videoPlayer.nativeElement.play();
        // TODO does not work
        /*console.log(this.videoPlayer.nativeElement);
        this.videoPlayer.nativeElement.src = this.address + '/api/v1/encoder/live.mpd';
        this.videoPlayer.nativeElement.oncanplay = () => {
          console.log('ready');
          this.videoPlayer.nativeElement.play();
        };*/
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('videoPlayer'),
        __metadata("design:type", Object)
    ], MobileComponent.prototype, "videoPlayer", void 0);
    MobileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mobile',
            template: __webpack_require__(/*! ./mobile.component.html */ "./src/app/mobile/mobile.component.html"),
            styles: [__webpack_require__(/*! ./mobile.component.sass */ "./src/app/mobile/mobile.component.sass")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], MobileComponent);
    return MobileComponent;
}());



/***/ }),

/***/ "./src/app/station/station.component.html":
/*!************************************************!*\
  !*** ./src/app/station/station.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutAlign=\"start stretch\" style=\"min-height: 100%; padding-left: 16px; padding-right: 16px;\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"space-around end\" style=\"padding-top: 200px\">\n    <mat-card fxFlex=\"80%\">\n      <form>\n        <mat-form-field style=\"width: 100%\">\n          <input matInput placeholder=\"Search\" value=\"\" [formControl]=\"searchControl\">\n          <mat-icon matSuffix>search</mat-icon>\n        </mat-form-field>\n      </form>\n    </mat-card>\n  </div>\n  <div fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" style=\"min-height: 60%\">\n    <app-you-tube-media fxFlex=\"16%\" style=\"margin: 8px 2%;\" [media]=\"media\" (mediaSelected)=\"requestMedia($event)\"\n      *ngFor=\"let media of medias\">\n    </app-you-tube-media>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/station/station.component.sass":
/*!************************************************!*\
  !*** ./src/app/station/station.component.sass ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0YXRpb24vc3RhdGlvbi5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/station/station.component.ts":
/*!**********************************************!*\
  !*** ./src/app/station/station.component.ts ***!
  \**********************************************/
/*! exports provided: StationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationComponent", function() { return StationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_you_tube_media_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/you-tube-media.service */ "./src/app/_services/you-tube-media.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StationComponent = /** @class */ (function () {
    function StationComponent(youTubeService, http, activatedRoute) {
        this.youTubeService = youTubeService;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.durationRegexp = /P(\d+)?T((\d+)H)?((\d+)M)?((\d+)S)?/g;
        this.medias = [
            { title: 'Arctic Monkeys - Do I Wanna Know? (Official Video)', image: 'https://i.ytimg.com/vi/bpOSxM0rNPM/default.jpg' },
            { title: 'Arctic Monkeys - R U Mine? (Official Video)', image: 'https://i.ytimg.com/vi/VQH8ZTgna3Q/default.jpg' },
            { title: 'Arctic Monkeys - Four Out Of Five (Official Video)', image: 'https://i.ytimg.com/vi/71Es-8FfATo/default.jpg' },
            { title: 'Arctic Monkeys - Why\'d You Only Call Me When You\'re High? (Official Video)', image: 'https://i.ytimg.com/vi/6366dxFf-Os/default.jpg' },
            { title: 'Arctic Monkeys - Arabella (Official Audio)', image: 'https://i.ytimg.com/vi/Jn6-TItCazo/default.jpg' },
            { title: 'Arctic Monkeys - Arabella (Official Video)', image: 'https://i.ytimg.com/vi/Nj8r3qmOoZ8/default.jpg' },
            { title: 'Arctic Monkeys - Snap Out Of It (Official Video)', image: 'https://i.ytimg.com/vi/H8tLS_NOWLs/default.jpg' },
            { title: 'Arctic Monkeys - One For The Road (Official Video)', image: 'https://i.ytimg.com/vi/qN7gSMPQFss/default.jpg' },
            { title: 'Arctic Monkeys - Anyways (Official Audio)', image: 'https://i.ytimg.com/vi/ytOtPkiw_5g/default.jpg' },
            { title: 'Arctic Monkeys - When The Sun Goes Down (Official Video)', image: 'https://i.ytimg.com/vi/EqkBRVukQmE/default.jpg' },
            { title: 'Arctic Monkeys - Fluorescent Adolescent (Official Video)', image: 'https://i.ytimg.com/vi/ma9I9VBKPiw/default.jpg' },
            { title: '505 lyrics - Arctic Monkeys', image: 'https://i.ytimg.com/vi/iV5VKdcQOJE/default.jpg' },
            { title: 'Arctic Monkeys - Tranquility Base Hotel & Casino (Official Video)', image: 'https://i.ytimg.com/vi/mXuUAtAtMtM/default.jpg' },
        ];
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('');
    }
    StationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.stationId = params['radio'];
            console.log(params);
        });
        this.searchControl.valueChanges.subscribe(function (value) {
            if (/https?:\/\/(www.youtube.com\/watch\?v=[\w\-]+)|(youtu.be\/[\w\-])/g.test(value)) {
                console.log("youtube url found!! " + value);
            }
            else {
                _this.youTubeService.search(_this.searchControl.value).subscribe(function (value) {
                    _this.medias = value.reduce(function (prev, curr) {
                        var duration = /P(\d+)?T((\d+)H)?((\d+)M)?((\d+)S)?/g.exec(curr.contentDetails.duration);
                        prev.push({
                            id: curr.id,
                            image: curr.snippet.thumbnails.default.url,
                            title: curr.snippet.title,
                            url: curr.id,
                            hours: duration[3],
                            minutes: duration[5],
                            seconds: duration[7]
                        });
                        return prev;
                    }, []);
                }, function (err) { return alert(err); });
            }
        });
    };
    StationComponent.prototype.requestMedia = function (media, self) {
        var _this = this;
        this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiURL + "/api/v1/cache/", {
            uri: media.id,
            url: media.url,
            title: media.title
        }, { responseType: 'text' }).toPromise().then(function (result) {
            console.log('cache!');
            console.log(result);
            return _this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiURL + "/api/v1/radios/" + _this.stationId + "/approval", {
                mediaId: media.id,
                url: media.url,
                title: media.title
            }).toPromise();
        }).then(function (result) {
            console.log('station approval!');
            console.log(result);
            alert(result['data']['status']);
        });
    };
    StationComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-station',
            template: __webpack_require__(/*! ./station.component.html */ "./src/app/station/station.component.html"),
            styles: [__webpack_require__(/*! ./station.component.sass */ "./src/app/station/station.component.sass")]
        }),
        __metadata("design:paramtypes", [_services_you_tube_media_service__WEBPACK_IMPORTED_MODULE_2__["YouTubeMediaService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], StationComponent);
    return StationComponent;
}());



/***/ }),

/***/ "./src/app/you-tube-media/you-tube-media.component.html":
/*!**************************************************************!*\
  !*** ./src/app/you-tube-media/you-tube-media.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <a (click)=\"requestMedia();\">\n    <h3>{{media.title}}</h3>\n  </a>\n  <div style=\"text-align: center; position: relative;\">\n    <img [src]=\"media.image\" alt=\"YouTube Media Image\" width=\"100%\">\n    <div style=\"position: absolute; bottom: 12px; right: 12px; background-color: rgba(131, 131, 131, 0.842); color: white; border-radius: 5px; padding: 4px 8px\">\n      {{media.hours ? media.hours + ':' : ''}}{{media.minutes}}:{{media.seconds}}\n    </div>\n  </div>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/you-tube-media/you-tube-media.component.sass":
/*!**************************************************************!*\
  !*** ./src/app/you-tube-media/you-tube-media.component.sass ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3lvdS10dWJlLW1lZGlhL3lvdS10dWJlLW1lZGlhLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/you-tube-media/you-tube-media.component.ts":
/*!************************************************************!*\
  !*** ./src/app/you-tube-media/you-tube-media.component.ts ***!
  \************************************************************/
/*! exports provided: YouTubeMediaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouTubeMediaComponent", function() { return YouTubeMediaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_you_tube_media__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_models/you-tube-media */ "./src/app/_models/you-tube-media.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YouTubeMediaComponent = /** @class */ (function () {
    function YouTubeMediaComponent() {
        this.mediaSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    YouTubeMediaComponent.prototype.ngOnInit = function () {
    };
    YouTubeMediaComponent.prototype.requestMedia = function () {
        this.mediaSelected.emit(this.media);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_you_tube_media__WEBPACK_IMPORTED_MODULE_1__["YouTubeMedia"])
    ], YouTubeMediaComponent.prototype, "media", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], YouTubeMediaComponent.prototype, "mediaSelected", void 0);
    YouTubeMediaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-you-tube-media',
            template: __webpack_require__(/*! ./you-tube-media.component.html */ "./src/app/you-tube-media/you-tube-media.component.html"),
            styles: [__webpack_require__(/*! ./you-tube-media.component.sass */ "./src/app/you-tube-media/you-tube-media.component.sass")]
        }),
        __metadata("design:paramtypes", [])
    ], YouTubeMediaComponent);
    return YouTubeMediaComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiURL: 'http://localhost:3000'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/siyahas/bitirme/PeopleRadio/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map