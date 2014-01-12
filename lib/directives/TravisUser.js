angular.module('travis-wall')
    .directive('ngTravisUser', function ($timeout, TravisRepository) {
        'use strict';

        return {
            require: 'ngModel',
            link: function (scope, element, attributes, control) {
                control.$detection = true;
                control.$processing = false;

                var _username = '';
                var _timeout;

                var _callback = function () {
                    $timeout.cancel(_timeout);

                    var username = element.val().trim();

                    if ((username === '') || (username === _username)) {
                        return;
                    }

                    control.$detection = true;
                    control.$setValidity('travis', true);

                    _timeout = $timeout(function () {
                        control.$detection = false;
                        control.$processing = true;

                        TravisRepository
                            .get(username)
                            .then(function (repositories) {
                                _username = username;

                                control.$setValidity('travis', repositories.length > 0);
                                control.$processing = false;
                            });
                    }, 1000);
                };

                // FIXME - Using the keyup/keydown events is a joke because it absolutely does not cover all use cases.
                element.on('keyup', _callback);
                element.on('keydown', _callback);
            }
        };
    });