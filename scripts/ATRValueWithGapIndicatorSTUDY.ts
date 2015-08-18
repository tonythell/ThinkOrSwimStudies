#
# Copyright 2014 Scott J. Johnson (http://scottjjohnson.com)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

#
# ATRValueWithGapIndicator
#
# Calculates the ATR and shows an indicator if there was a significant 
# gap up or down at the open.  A gap up may be buyable if the volume >= 150%
# of the average volume over the last 50 sessions.
#
declare lower;

input ATRLength = 40;
input MinimumPercentGap = 0.75;

def ATRPercent = Average(TrueRange(high, close, low), ATRLength) / close * 100;
def OpenPriceGap = open - close[1];
def GapUpEvent = OpenPriceGap >= MinimumPercentGap * ATRPercent;
def GapDownEvent = OpenPriceGap <= -MinimumPercentGap * ATRPercent;

plot Display = Round(ATRPercent, 2);

Display.AssignValueColor(if GapDownEvent >= 1 then Color.RED else if GapUpEvent >= 1 then Color.GREEN else Color.DARK_GRAY);
Display.SetLineWeight(3);