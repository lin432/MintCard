--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Images; Type: TABLE; Schema: C09; Owner: postgres
--

CREATE TABLE "C09"."Images" (
    id integer,
    name character varying(30),
    path character varying(30)
);


ALTER TABLE "C09"."Images" OWNER TO postgres;

--
-- Data for Name: Images; Type: TABLE DATA; Schema: C09; Owner: postgres
--

COPY "C09"."Images" (id, name, path) FROM stdin;
1	Absorb	card_image_1
2	Acclaimed Contender	card_image_2
3	Acolyte of Affliction	card_image_3
4	Act of Treason	card_image_4
5	Aerial Assault	card_image_5
6	Aeromunculus	card_image_6
7	Aether Gust	card_image_7
8	Affectionate Indrik	card_image_8
9	Agent of Treachery	card_image_9
10	Aggressive Mammoth	card_image_10
11	Agonizing Remorse	card_image_11
12	Agonizing Syphon	card_image_12
13	Ahn-Crop Invader	card_image_13
14	Aid the Fallen	card_image_14
15	Air Elemental	card_image_15
16	Ajani's Pridemate	card_image_16
17	Ajani, Inspiring Leader	card_image_17
18	Ajani, Strength of the Pride	card_image_18
19	Ajani, the Greathearted	card_image_19
20	Alela, Artful Provocateur	card_image_20
21	Alirios, Enraptured	card_image_21
22	All That Glitters	card_image_22
23	Allure of the Unknown	card_image_23
24	Alseid of Life's Bounty	card_image_24
25	Altar of the Pantheon	card_image_25
26	Alter Fate	card_image_26
27	Amplifire	card_image_27
28	Anax, Hardened in the Forge	card_image_28
29	Ancestral Blade	card_image_29
30	Angel of Grace	card_image_30
31	Angel of Vitality	card_image_31
32	Angelic Exaltation	card_image_32
33	Angelic Gift	card_image_33
34	Angelic Guardian	card_image_34
35	Angrath's Rampage	card_image_35
36	Angrath, Captain of Chaos	card_image_36
37	Animating Faerie	card_image_37
38	Anticipate	card_image_38
39	Anvilwrought Raptor	card_image_39
40	Aphemia, the Cacophony	card_image_40
41	Apostle of Purifying Light	card_image_41
42	Applied Biomancy	card_image_42
43	Arasta of the Endless Web	card_image_43
44	Arboreal Grazer	card_image_44
45	Arboretum Elemental	card_image_45
46	Arcane Signet	card_image_46
47	Arcanist's Owl	card_image_47
48	Archon of Absolution	card_image_48
49	Archon of Falling Stars	card_image_49
50	Archon of Sun's Grace	card_image_50
51	Archway Angel	card_image_51
52	Arclight Phoenix	card_image_52
53	Ardenvale Paladin	card_image_53
54	Ardenvale Tactician	card_image_54
55	Arena Trickster	card_image_55
56	Arlinn's Wolf	card_image_56
57	Arlinn, Voice of the Pack	card_image_57
58	Arrester's Admonition	card_image_58
59	Arrester's Zeal	card_image_59
60	Artful Takedown	card_image_60
61	Ashiok's Erasure	card_image_61
62	Ashiok's Forerunner	card_image_62
63	Ashiok's Skulker	card_image_63
64	Ashiok, Dream Render	card_image_64
65	Ashiok, Nightmare Muse	card_image_65
66	Ashiok, Sculptor of Fears	card_image_66
67	Aspect of Lamprey	card_image_67
68	Aspect of Manticore	card_image_68
69	Assassin's Trophy	card_image_69
70	Assemble	card_image_70
71	Assure	card_image_71
72	Atemsis, All-Seeing	card_image_72
73	Athreos, Shroud-Veiled	card_image_73
74	Atris, Oracle of Half-Truths	card_image_74
75	Attendant of Vraska	card_image_75
76	Audacious Thief	card_image_76
77	Augur of Bolas	card_image_77
78	Aurelia, Exemplar of Justice	card_image_78
79	Aven Eternal	card_image_79
80	Awaken the Erstwhile	card_image_80
81	Awakening of Vitu-Ghazi	card_image_81
82	Axebane Beast	card_image_82
83	Ayara, First of Locthwain	card_image_83
84	Azorius Guildgate	card_image_84
85	Azorius Knight-Arbiter	card_image_85
86	Azorius Locket	card_image_86
87	Azorius Skyguard	card_image_87
88	Bag of Holding	card_image_88
89	Bake into a Pie	card_image_89
90	Band Together	card_image_90
91	Banehound	card_image_91
92	Banish into Fable	card_image_92
93	Banishing Light	card_image_93
94	Bankrupt in Blood	card_image_94
95	Barge In	card_image_95
96	Barging Sergeant	card_image_96
97	Barkhide Troll	card_image_97
98	Barony Vampire	card_image_98
99	Barrier of Bones	card_image_99
100	Barrow Witches	card_image_100
101	Bartered Cow	card_image_101
102	Bartizan Bats	card_image_102
103	Basilica Bell-Haunt	card_image_103
104	Bastion Enforcer	card_image_104
105	Battalion Foot Soldier	card_image_105
106	Battle Display	card_image_106
107	Battlefield Promotion	card_image_107
108	Beacon Bolt	card_image_108
109	Beamsplitter Mage	card_image_109
110	Beanstalk Giant	card_image_110
111	Beast Whisperer	card_image_111
112	Bedazzle	card_image_112
113	Bedeck	card_image_113
114	Bedevil	card_image_114
115	Befuddle	card_image_115
116	Belle of the Brawl	card_image_116
117	Beloved Princess	card_image_117
118	Benthic Biomancer	card_image_118
119	Bioessence Hydra	card_image_119
120	Biogenic Ooze	card_image_120
121	Biogenic Upgrade	card_image_121
122	Biomancer's Familiar	card_image_122
123	Bishop of Wings	card_image_123
124	Blacklance Paragon	card_image_124
125	Blade Instructor	card_image_125
126	Blade Juggler	card_image_126
127	Bladebrand	card_image_127
128	Blast Zone	card_image_128
129	Bleeding Edge	card_image_129
130	Blight-Breath Catoblepas	card_image_130
131	Blightbeetle	card_image_131
132	Blindblast	card_image_132
133	Blood Aspirant	card_image_133
134	Blood Burglar	card_image_134
135	Blood Crypt	card_image_135
136	Blood Operative	card_image_136
137	Blood for Bones	card_image_137
138	Bloodfell Caves	card_image_138
139	Bloodhaze Wolverine	card_image_139
140	Bloodmist Infiltrator	card_image_140
141	Bloodsoaked Altar	card_image_141
142	Bloodthirsty Aerialist	card_image_142
143	Bloom Hulk	card_image_143
144	Blossoming Sands	card_image_144
145	Blow Your House Down	card_image_145
146	Bog Naughty	card_image_146
147	Bogstomper	card_image_147
148	Bolas's Citadel	card_image_148
149	Bolrac-Clan Crusher	card_image_149
150	Bolt Bend	card_image_150
151	Bond of Discipline	card_image_151
152	Bond of Flourishing	card_image_152
153	Bond of Insight	card_image_153
154	Bond of Passion	card_image_154
155	Bond of Revival	card_image_155
156	Bone Splinters	card_image_156
157	Bone to Ash	card_image_157
158	Boneclad Necromancer	card_image_158
159	Bonecrusher Giant	card_image_159
160	Book Devourer	card_image_160
161	Boreal Elemental	card_image_161
162	Boros Challenger	card_image_162
163	Boros Guildgate	card_image_163
164	Boros Locket	card_image_164
165	Boulder Rush	card_image_165
166	Bounty Agent	card_image_166
167	Bounty of Might	card_image_167
168	Bramblefort Fink	card_image_168
169	Brazen Borrower	card_image_169
170	Breeding Pool	card_image_170
171	Brightwood Tracker	card_image_171
172	Brimstone Trebuchet	card_image_172
173	Brine Giant	card_image_173
174	Brineborn Cutthroat	card_image_174
175	Bring Back	card_image_175
176	Bring to Life	card_image_176
177	Bring to Trial	card_image_177
178	Bristling Boar	card_image_178
179	Bronze Sword	card_image_179
180	Bronzehide Lion	card_image_180
181	Brought Back	card_image_181
182	Bulwark Giant	card_image_182
183	Burglar Rat	card_image_183
184	Burn Bright	card_image_184
185	Burning Prophet	card_image_185
186	Burning-Tree Vandal	card_image_186
187	Burning-Yard Trainer	card_image_187
188	Calix, Destiny's Hand	card_image_188
189	Callaphe, Beloved of the Sea	card_image_189
190	Callous Dismissal	card_image_190
191	Camaraderie	card_image_191
192	Candlelight Vigil	card_image_192
193	Canopy Spider	card_image_193
194	Captivating Gyre	card_image_194
195	Captivating Unicorn	card_image_195
196	Captive Audience	card_image_196
197	Capture Sphere	card_image_197
198	Careless Celebrant	card_image_198
199	Carnage	card_image_199
200	Carnival	card_image_200
201	Carrion Imp	card_image_201
202	Cast Off	card_image_202
203	Castle Ardenvale	card_image_203
204	Castle Embereth	card_image_204
205	Castle Garenbrig	card_image_205
206	Castle Locthwain	card_image_206
207	Castle Vantress	card_image_207
208	Casualties of War	card_image_208
209	Catacomb Crocodile	card_image_209
210	Cauldron Familiar	card_image_210
211	Cauldron's Gift	card_image_211
212	Cavalcade of Calamity	card_image_212
213	Cavalier of Dawn	card_image_213
214	Cavalier of Flame	card_image_214
215	Cavalier of Gales	card_image_215
216	Cavalier of Night	card_image_216
217	Cavalier of Thorns	card_image_217
218	Celestial Messenger	card_image_218
219	Centaur Courser	card_image_219
220	Centaur Nurturer	card_image_220
221	Centaur Peacemaker	card_image_221
222	Cerulean Drake	card_image_222
223	Chain to Memory	card_image_223
224	Chainweb Aracnir	card_image_224
225	Chainwhip Cyclops	card_image_225
226	Challenger Troll	card_image_226
227	Chamber Sentry	card_image_227
228	Chance for Glory	card_image_228
229	Chandra's Embercat	card_image_229
230	Chandra's Flame Wave	card_image_230
231	Chandra's Outrage	card_image_231
232	Chandra's Pyrohelix	card_image_232
233	Chandra's Regulator	card_image_233
234	Chandra's Spitfire	card_image_234
235	Chandra's Triumph	card_image_235
236	Chandra, Acolyte of Flame	card_image_236
237	Chandra, Awakened Inferno	card_image_237
238	Chandra, Fire Artisan	card_image_238
239	Chandra, Flame's Fury	card_image_239
240	Chandra, Novice Pyromancer	card_image_240
241	Charging War Boar	card_image_241
242	Charity Extractor	card_image_242
243	Charmed Sleep	card_image_243
244	Charmed Stray	card_image_244
245	Charming Prince	card_image_245
246	Charnel Troll	card_image_246
247	Chemister's Insight	card_image_247
248	Child of Night	card_image_248
249	Chillbringer	card_image_249
250	Chittering Witch	card_image_250
251	Chop Down	card_image_251
252	Chromatic Lantern	card_image_252
253	Chulane, Teller of Tales	card_image_253
254	Cindervines	card_image_254
255	Circuitous Route	card_image_255
256	Citywatch Sphinx	card_image_256
257	Citywide Bust	card_image_257
258	Civic Stalwart	card_image_258
259	Clackbridge Troll	card_image_259
260	Claim the Firstborn	card_image_260
261	Clamor Shaman	card_image_261
262	Clan Guildmage	card_image_262
263	Clear the Mind	card_image_263
264	Clear the Stage	card_image_264
265	Cling to Dust	card_image_265
266	Clockwork Servant	card_image_266
267	Cloudkin Seer	card_image_267
268	Code of Constraint	card_image_268
269	Collar the Culprit	card_image_269
270	Collision	card_image_270
271	Colossus	card_image_271
272	Colossus Hammer	card_image_272
273	Combine Guildmage	card_image_273
274	Command Tower	card_image_274
275	Command the Dreadhorde	card_image_275
276	Command the Storm	card_image_276
277	Commanding Presence	card_image_277
278	Commence the Endgame	card_image_278
279	Conclave Cavalier	card_image_279
280	Conclave Guildmage	card_image_280
281	Conclave Tribunal	card_image_281
282	Concoct	card_image_282
283	Concordia Pegasus	card_image_283
284	Connive	card_image_284
285	Consecrate	card_image_285
286	Consign to the Pit	card_image_286
287	Consume	card_image_287
288	Contentious Plan	card_image_288
289	Convolute	card_image_289
290	Coral Commando	card_image_290
291	Coral Merfolk	card_image_291
292	Corpse Knight	card_image_292
293	Corridor Monitor	card_image_293
294	Cosmotronic Wave	card_image_294
295	Courage in Crisis	card_image_295
296	Covetous Urge	card_image_296
297	Crackling Drake	card_image_297
298	Crashing Drawbridge	card_image_298
299	Creeping Chill	card_image_299
300	Creeping Trailblazer	card_image_300
301	Cruel Celebrant	card_image_301
302	Crush Contraband	card_image_302
303	Crush Dissent	card_image_303
304	Crushing Canopy	card_image_304
305	Cry of the Carnarium	card_image_305
306	Cryptic Caves	card_image_306
307	Crystal Slipper	card_image_307
308	Cult Guildmage	card_image_308
309	Curious Pair	card_image_309
310	Curry Favor	card_image_310
311	Cyclops Electromancer	card_image_311
312	Dagger Caster	card_image_312
313	Daggersail Aeronaut	card_image_313
314	Dalakos, Crafter of Wonders	card_image_314
315	Dance of the Manse	card_image_315
316	Dark Remedy	card_image_316
317	Darkblade Agent	card_image_317
318	Davriel's Shadowfugue	card_image_318
319	Davriel, Rogue Shadowmage	card_image_319
320	Dawn Evangel	card_image_320
321	Dawn of Hope	card_image_321
322	Dawning Angel	card_image_322
323	Daxos, Blessed by the Sun	card_image_323
324	Daybreak Chaplain	card_image_324
325	Daybreak Chimera	card_image_325
326	Dazzling Lights	card_image_326
327	Dead Revels	card_image_327
328	Dead Weight	card_image_328
329	Deadly Visit	card_image_329
330	Deafening Clarion	card_image_330
331	Deafening Silence	card_image_331
332	Deathbellow War Cry	card_image_332
333	Deathless Knight	card_image_333
334	Deathsprout	card_image_334
335	Debtors' Transport	card_image_335
336	Deface	card_image_336
337	Defiant Strike	card_image_337
338	Deliver Unto Evil	card_image_338
339	Demolish	card_image_339
340	Demon of Loathing	card_image_340
341	Demotion	card_image_341
342	Deny the Divine	card_image_342
343	Deploy	card_image_343
344	Depose	card_image_344
345	Deputy of Detention	card_image_345
346	Despark	card_image_346
347	Desperate Lunge	card_image_347
348	Destiny Spinner	card_image_348
349	Destructive Digger	card_image_349
350	Devious Cover-Up	card_image_350
351	Devkarin Dissident	card_image_351
352	Devourer of Memory	card_image_352
353	Devouring Hellion	card_image_353
354	Devout Decree	card_image_354
355	Diamond Knight	card_image_355
356	Didn't Say Please	card_image_356
357	Dimir Guildgate	card_image_357
358	Dimir Informant	card_image_358
359	Dimir Locket	card_image_359
360	Dimir Spybug	card_image_360
361	Direct Current	card_image_361
362	Discordant Piper	card_image_362
363	Discovery	card_image_363
364	Disdainful Stroke	card_image_364
365	Disenchant	card_image_365
366	Disentomb	card_image_366
367	Disfigure	card_image_367
368	Disinformation Campaign	card_image_368
369	Dismal Backwater	card_image_369
370	Dispersal	card_image_370
371	District Guide	card_image_371
372	Divine Arrow	card_image_372
373	Divine Visitation	card_image_373
374	Diviner's Lockbox	card_image_374
375	Dizzying Swoop	card_image_375
376	Domri's Ambush	card_image_376
377	Domri's Nodorog	card_image_377
378	Domri, Anarch of Bolas	card_image_378
379	Domri, Chaos Bringer	card_image_379
380	Domri, City Smasher	card_image_380
381	Doom Foretold	card_image_381
382	Doom Whisperer	card_image_382
383	Douser of Lights	card_image_383
384	Dovin's Acuity	card_image_384
385	Dovin's Automaton	card_image_385
386	Dovin's Dismissal	card_image_386
387	Dovin's Veto	card_image_387
388	Dovin, Architect of Law	card_image_388
389	Dovin, Grand Arbiter	card_image_389
390	Dovin, Hand of Control	card_image_390
391	Drag to the Underworld	card_image_391
392	Dragon Mage	card_image_392
393	Drakuseth, Maw of Flames	card_image_393
394	Drawn from Dreams	card_image_394
395	Dread Presence	card_image_395
396	Dreadful Apathy	card_image_396
397	Dreadhorde Arcanist	card_image_397
398	Dreadhorde Butcher	card_image_398
399	Dreadhorde Invasion	card_image_399
400	Dreadhorde Twins	card_image_400
401	Dreadmalkin	card_image_401
402	Dream Eater	card_image_402
403	Dream Trawler	card_image_403
404	Dreamshaper Shaman	card_image_404
405	Dreamstalker Manticore	card_image_405
406	Drill Bit	card_image_406
407	Drown in the Loch	card_image_407
408	Drowned Secrets	card_image_408
409	Dryad of the Ilysian Grove	card_image_409
410	Dungeon Geists	card_image_410
411	Duress	card_image_411
412	Duskmantle Operative	card_image_412
413	Dwarven Mine	card_image_413
414	Eat to Extinction	card_image_414
415	Edgewall Innkeeper	card_image_415
416	Eidolon of Inspiration	card_image_416
417	Eidolon of Obstruction	card_image_417
418	Eidolon of Philosophy	card_image_418
419	Electrodominance	card_image_419
420	Electrostatic Field	card_image_420
421	Elite Arrester	card_image_421
422	Elite Guardmage	card_image_422
423	Elite Headhunter	card_image_423
424	Elite Instructor	card_image_424
425	Elspeth Conquers Death	card_image_425
426	Elspeth's Devotee	card_image_426
427	Elspeth's Nightmare	card_image_427
428	Elspeth, Sun's Nemesis	card_image_428
429	Elspeth, Undaunted Hero	card_image_429
430	Elvish Reclaimer	card_image_430
431	Ember Hauler	card_image_431
432	Embercleave	card_image_432
433	Embereth Paladin	card_image_433
434	Embereth Shieldbreaker	card_image_434
435	Embereth Skyblazer	card_image_435
436	Embodiment of Agonies	card_image_436
437	Emergence Zone	card_image_437
438	Emergency Powers	card_image_438
439	Emmara, Soul of the Accord	card_image_439
440	Empyrean Eagle	card_image_440
441	Emry, Lurker of the Loch	card_image_441
442	Enchanted Carriage	card_image_442
443	End-Raze Forerunners	card_image_443
444	Enemy of Enlightenment	card_image_444
445	Enforcer Griffin	card_image_445
446	Engulfing Eruption	card_image_446
447	Enhanced Surveillance	card_image_447
448	Enigmatic Incarnation	card_image_448
449	Enraged Ceratok	card_image_449
450	Enter the God-Eternals	card_image_450
451	Entrancing Lyre	card_image_451
452	Epic Downfall	card_image_452
453	Epicure of Blood	card_image_453
454	Erebos's Intervention	card_image_454
455	Erebos, Bleak-Hearted	card_image_455
456	Erratic Cyclops	card_image_456
457	Erratic Visionary	card_image_457
458	Erstwhile Trooper	card_image_458
459	Escape Velocity	card_image_459
460	Escape to the Wilds	card_image_460
461	Essence Capture	card_image_461
462	Eternal Isolation	card_image_462
463	Eternal Skylord	card_image_463
464	Eternal Taskmaster	card_image_464
465	Ethereal Absolution	card_image_465
466	Ethereal Elk	card_image_466
467	Etrata, the Silencer	card_image_467
468	Eutropia the Twice-Favored	card_image_468
469	Evolution Sage	card_image_469
470	Evolving Wilds	card_image_470
471	Expansion	card_image_471
472	Experimental Frenzy	card_image_472
473	Explosion	card_image_473
474	Expose to Daylight	card_image_474
475	Eye Collector	card_image_475
476	Eyes Everywhere	card_image_476
477	Fabled Passage	card_image_477
478	Fae of Wishes	card_image_478
479	Faeburrow Elder	card_image_479
480	Faerie Duelist	card_image_480
481	Faerie Formation	card_image_481
482	Faerie Guidemother	card_image_482
483	Faerie Miscreant	card_image_483
484	Faerie Vandal	card_image_484
485	Fateful End	card_image_485
486	Fathom Fleet Cutthroat	card_image_486
487	Favored of Iroas	card_image_487
488	Fblthp, the Lost	card_image_488
489	Fearless Halberdier	card_image_489
490	Feasting Troll King	card_image_490
491	Feather, the Redeemed	card_image_491
492	Fell the Pheasant	card_image_492
493	Fencing Ace	card_image_493
494	Feral Abomination	card_image_494
495	Feral Invocation	card_image_495
496	Feral Maaka	card_image_496
497	Ferocious Pup	card_image_497
498	Ferocity of the Wilds	card_image_498
499	Fertile Footsteps	card_image_499
500	Fervent Champion	card_image_500
501	Festive Funeral	card_image_501
502	Field of Ruin	card_image_502
503	Fierce Witchstalker	card_image_503
504	Final Death	card_image_504
505	Final Flare	card_image_505
506	Final Payment	card_image_506
507	Finale of Devastation	card_image_507
508	Finale of Eternity	card_image_508
509	Finale of Glory	card_image_509
510	Finale of Promise	card_image_510
511	Finale of Revelation	card_image_511
512	Finality	card_image_512
513	Find	card_image_513
514	Fire Elemental	card_image_514
515	Fire Urchin	card_image_515
516	Fireblade Artist	card_image_516
517	Fireborn Knight	card_image_517
518	Firemind Vessel	card_image_518
519	Firemind's Research	card_image_519
520	Fires of Invention	card_image_520
521	Flame Sweep	card_image_521
522	Flames of the Raze-Boar	card_image_522
523	Flaxen Intruder	card_image_523
524	Flicker of Fate	card_image_524
525	Flight of Equenauts	card_image_525
526	Fling	card_image_526
527	Flood of Tears	card_image_527
528	Flourish	card_image_528
529	Flower	card_image_529
530	Flummoxed Cyclops	card_image_530
531	Flutterfox	card_image_531
532	Flux Channeler	card_image_532
533	Folio of Fancies	card_image_533
534	Font of Agonies	card_image_534
535	Footlight Fiend	card_image_535
536	Forbidding Spirit	card_image_536
537	Forced Landing	card_image_537
538	Foreboding Fruit	card_image_538
539	Forest	card_image_539
540	Forever Young	card_image_540
541	Fortifying Provisions	card_image_541
542	Fortress Crab	card_image_542
543	Foulmire Knight	card_image_543
544	Frenzied Arynx	card_image_544
545	Fresh-Faced Recruit	card_image_545
546	Frilled Mystic	card_image_546
547	Frilled Sandwalla	card_image_547
548	Frilled Sea Serpent	card_image_548
549	Frogify	card_image_549
550	Frost Lynx	card_image_550
551	Fruit of Tizerus	card_image_551
552	Fry	card_image_552
553	Funeral Rites	card_image_553
554	Furious Rise	card_image_554
555	Gadwick, the Wizened	card_image_555
556	Gallia of the Endless Dance	card_image_556
557	Galloping Lizrog	card_image_557
558	Garenbrig Carver	card_image_558
559	Garenbrig Paladin	card_image_559
560	Garenbrig Squire	card_image_560
561	Gargos, Vicious Watcher	card_image_561
562	Garrison Griffin	card_image_562
563	Garrison Sergeant	card_image_563
564	Garruk, Cursed Huntsman	card_image_564
565	Gate Colossus	card_image_565
566	Gatebreaker Ram	card_image_566
567	Gatekeeper Gargoyle	card_image_567
568	Gates Ablaze	card_image_568
569	Gateway Plaza	card_image_569
570	Gateway Sneak	card_image_570
571	Gauntlets of Light	card_image_571
572	Generous Stray	card_image_572
573	Get the Point	card_image_573
574	Ghor-Clan Wrecker	card_image_574
575	Giant Growth	card_image_575
576	Giant Killer	card_image_576
577	Giant Opportunity	card_image_577
578	Giant's Skewer	card_image_578
579	Gideon Blackblade	card_image_579
580	Gideon's Battle Cry	card_image_580
581	Gideon's Company	card_image_581
582	Gideon's Sacrifice	card_image_582
583	Gideon's Triumph	card_image_583
584	Gideon, the Oathsworn	card_image_584
585	Gift of Paradise	card_image_585
586	Gift of Strength	card_image_586
587	Gift of the Fae	card_image_587
588	Gilded Goose	card_image_588
589	Gingerbread Cabin	card_image_589
590	Gingerbrute	card_image_590
591	Gird for Battle	card_image_591
592	Glaive of the Guildpact	card_image_592
593	Glaring Aegis	card_image_593
594	Glass Casket	card_image_594
595	Glass of the Guildpact	card_image_595
596	Gleaming Overseer	card_image_596
597	Glimpse of Freedom	card_image_597
598	Glint-Horn Buccaneer	card_image_598
599	Glory Bearers	card_image_599
600	Glowspore Shaman	card_image_600
601	Gluttonous Troll	card_image_601
602	Gnarlback Rhino	card_image_602
603	Goblin Assailant	card_image_603
604	Goblin Assault Team	card_image_604
605	Goblin Banneret	card_image_605
606	Goblin Bird-Grabber	card_image_606
607	Goblin Cratermaker	card_image_607
608	Goblin Electromancer	card_image_608
609	Goblin Gathering	card_image_609
610	Goblin Locksmith	card_image_610
611	Goblin Ringleader	card_image_611
612	Goblin Smuggler	card_image_612
613	God-Eternal Bontu	card_image_613
614	God-Eternal Kefnet	card_image_614
615	God-Eternal Oketra	card_image_615
616	God-Eternal Rhonas	card_image_616
617	God-Pharaoh's Statue	card_image_617
618	Godless Shrine	card_image_618
619	Gods Willing	card_image_619
620	Golden Egg	card_image_620
621	Goldmane Griffin	card_image_621
622	Golgari Findbroker	card_image_622
623	Golgari Guildgate	card_image_623
624	Golgari Locket	card_image_624
625	Golgari Raiders	card_image_625
626	Golos, Tireless Pilgrim	card_image_626
627	Gorging Vulture	card_image_627
628	Grafdigger's Cage	card_image_628
629	Granted	card_image_629
630	Grappling Sundew	card_image_630
631	Grasping Giant	card_image_631
632	Grasping Thrull	card_image_632
633	Grateful Apparition	card_image_633
634	Gravebreaker Lamia	card_image_634
635	Gravedigger	card_image_635
636	Gravel-Hide Goblin	card_image_636
637	Gravewaker	card_image_637
638	Gravitic Punch	card_image_638
639	Gray Merchant of Asphodel	card_image_639
640	Greenwood Sentinel	card_image_640
641	Griffin Protector	card_image_641
642	Griffin Sentinel	card_image_642
643	Grim Initiate	card_image_643
644	Grim Physician	card_image_644
645	Grotesque Demise	card_image_645
646	Growth Cycle	card_image_646
647	Growth Spiral	card_image_647
648	Growth-Chamber Guardian	card_image_648
649	Gruesome Menagerie	card_image_649
650	Gruesome Scourger	card_image_650
651	Grumgully, the Generous	card_image_651
652	Gruul Beastmaster	card_image_652
653	Gruul Guildgate	card_image_653
654	Gruul Locket	card_image_654
655	Gruul Spellbreaker	card_image_655
656	Guardian Project	card_image_656
657	Guild Globe	card_image_657
658	Guild Summit	card_image_658
659	Guildmages' Forum	card_image_659
660	Guildpact Informant	card_image_660
661	Gutterbones	card_image_661
662	Gyre Engineer	card_image_662
663	Haazda Marshal	card_image_663
664	Haazda Officer	card_image_664
665	Hackrobat	card_image_665
666	Haggle	card_image_666
667	Haktos the Unscarred	card_image_667
668	Hallowed Fountain	card_image_668
669	Hammer Dropper	card_image_669
670	Hanged Executioner	card_image_670
671	Happily Ever After	card_image_671
672	Hard Cover	card_image_672
673	Harmonious Archon	card_image_673
674	Harvest Fear	card_image_674
675	Hatchery Spider	card_image_675
676	Hateful Eidolon	card_image_676
677	Healer of the Glade	card_image_677
678	Healer's Hawk	card_image_678
679	Heart's Desire	card_image_679
680	Heart-Piercer Bow	card_image_680
681	Heartfire	card_image_681
682	Heartwarming Redemption	card_image_682
683	Heliod's Intervention	card_image_683
684	Heliod's Pilgrim	card_image_684
685	Heliod's Punishment	card_image_685
686	Heliod, Sun-Crowned	card_image_686
687	Hellkite Whelp	card_image_687
688	Henge Walker	card_image_688
689	Herald of the Dreadhorde	card_image_689
690	Herald of the Sun	card_image_690
691	Heraldic Banner	card_image_691
692	Hero of Precinct One	card_image_692
693	Hero of the Games	card_image_693
694	Hero of the Nyxborn	card_image_694
695	Hero of the Pride	card_image_695
696	Hero of the Winds	card_image_696
697	Heroes of the Revel	card_image_697
698	High Alert	card_image_698
699	Hired Poisoner	card_image_699
700	Hitchclaw Recluse	card_image_700
701	Honor the God-Pharaoh	card_image_701
702	Hostile Minotaur	card_image_702
703	House Guildmage	card_image_703
704	Howling Giant	card_image_704
705	Huatli's Raptor	card_image_705
706	Huatli, the Sun's Heart	card_image_706
707	Humongulus	card_image_707
708	Hunted Witness	card_image_708
709	Hushbringer	card_image_709
710	Hydra's Growth	card_image_710
711	Hydroid Krasis	card_image_711
712	Hypnotic Sprite	card_image_712
713	Hypothesizzle	card_image_713
714	Hyrax Tower Scout	card_image_714
715	Ichthyomorphosis	card_image_715
716	Icon of Ancestry	card_image_716
717	Idyllic Grange	card_image_717
718	Idyllic Tutor	card_image_718
719	Ignite the Beacon	card_image_719
720	Ilharg, the Raze-Boar	card_image_720
721	Ill-Gotten Inheritance	card_image_721
722	Ilysian Caryatid	card_image_722
723	Immolation Shaman	card_image_723
724	Immortal Phoenix	card_image_724
725	Impassioned Orator	card_image_725
726	Impending Doom	card_image_726
727	Imperial Outrider	card_image_727
728	Imperious Oligarch	card_image_728
729	Impervious Greatwurm	card_image_729
730	Improbable Alliance	card_image_730
731	Incendiary Oracle	card_image_731
732	Incongruity	card_image_732
733	Incubation	card_image_733
734	Incubation Druid	card_image_734
735	Indomitable Will	card_image_735
736	Inescapable Blaze	card_image_736
737	Inevitable End	card_image_737
738	Infuriate	card_image_738
739	Inquisitive Puppet	card_image_739
740	Insatiable Appetite	card_image_740
741	Inspire Awe	card_image_741
742	Inspired Charge	card_image_742
743	Inspiring Captain	card_image_743
744	Inspiring Unicorn	card_image_744
745	Inspiring Veteran	card_image_745
746	Integrity	card_image_746
747	Interplanar Beacon	card_image_747
748	Intervention	card_image_748
749	Into the Story	card_image_749
750	Intrusive Packbeast	card_image_750
751	Invade the City	card_image_751
752	Invading Manticore	card_image_752
753	Invent	card_image_753
754	Invert	card_image_754
755	Ionize	card_image_755
756	Irencrag Feat	card_image_756
757	Irencrag Pyromancer	card_image_757
758	Iroas's Blessing	card_image_758
759	Iron Bully	card_image_759
760	Ironclad Krovod	card_image_760
761	Ironroot Warlord	card_image_761
762	Ironscale Hydra	card_image_762
763	Ironshell Beetle	card_image_763
764	Irreverent Revelers	card_image_764
765	Island	card_image_765
766	Izoni, Thousand-Eyed	card_image_766
767	Izzet Guildgate	card_image_767
768	Izzet Locket	card_image_768
769	Jace's Projection	card_image_769
770	Jace's Ruse	card_image_770
771	Jace's Triumph	card_image_771
772	Jace, Arcane Strategist	card_image_772
773	Jace, Wielder of Mysteries	card_image_773
774	Jaya's Greeting	card_image_774
775	Jaya, Venerated Firemage	card_image_775
776	Jiang Yanggu, Wildcrafter	card_image_776
777	Join Shields	card_image_777
778	Joust	card_image_778
779	Jousting Dummy	card_image_779
780	Judith, the Scourge Diva	card_image_780
781	Jungle Hollow	card_image_781
782	Junktroller	card_image_782
783	Justice Strike	card_image_783
784	Justiciar's Portal	card_image_784
785	Kaalia, Zenith Seeker	card_image_785
786	Karametra's Blessing	card_image_786
787	Karn's Bastion	card_image_787
788	Karn, the Great Creator	card_image_788
789	Kasmina's Transmutation	card_image_789
790	Kasmina, Enigmatic Mentor	card_image_790
791	Kaya's Ghostform	card_image_791
792	Kaya's Wrath	card_image_792
793	Kaya, Bane of the Dead	card_image_793
794	Kaya, Orzhov Usurper	card_image_794
795	Keeper of Fables	card_image_795
796	Keldon Raider	card_image_796
797	Kenrith's Transformation	card_image_797
798	Kenrith, the Returned King	card_image_798
799	Kethis, the Hidden Hand	card_image_799
800	Kiora Bests the Sea God	card_image_800
801	Kiora's Dambreaker	card_image_801
802	Kiora, Behemoth Beckoner	card_image_802
803	Klothys's Design	card_image_803
804	Klothys, God of Destiny	card_image_804
805	Knight of Autumn	card_image_805
806	Knight of Sorrows	card_image_806
807	Knight of the Ebon Legion	card_image_807
808	Knight of the Keep	card_image_808
809	Knight of the Last Breath	card_image_809
810	Knights' Charge	card_image_810
811	Korvold, Fae-Cursed King	card_image_811
812	Kraul Foragers	card_image_812
813	Kraul Harpooner	card_image_813
814	Kraul Raider	card_image_814
815	Kraul Stinger	card_image_815
816	Kraul Swarm	card_image_816
817	Krenko, Tin Street Kingpin	card_image_817
818	Kronch Wrangler	card_image_818
819	Kroxa, Titan of Death's Hunger	card_image_819
820	Kunoros, Hound of Athreos	card_image_820
821	Kykar, Wind's Fury	card_image_821
822	Labyrinth of Skophos	card_image_822
823	Lagonna-Band Storyteller	card_image_823
824	Lampad of Death's Vigil	card_image_824
825	Lash of Thorns	card_image_825
826	Lava Coil	card_image_826
827	Lavakin Brawler	card_image_827
828	Lavinia, Azorius Renegade	card_image_828
829	Law-Rune Enforcer	card_image_829
830	Lawmage's Binding	card_image_830
831	Lazav, the Multifarious	card_image_831
832	Lazotep Behemoth	card_image_832
833	Lazotep Plating	card_image_833
834	Lazotep Reaver	card_image_834
835	Leafkin Druid	card_image_835
836	League Guildmage	card_image_836
837	Leapfrog	card_image_837
838	Ledev Champion	card_image_838
839	Ledev Guardian	card_image_839
840	Legion Guildmage	card_image_840
841	Legion Warboss	card_image_841
842	Legion's End	card_image_842
843	Leonin of the Lost Pride	card_image_843
844	Leyline Prowler	card_image_844
845	Leyline of Abundance	card_image_845
846	Leyline of Anticipation	card_image_846
847	Leyline of Combustion	card_image_847
848	Leyline of Sanctity	card_image_848
849	Leyline of the Void	card_image_849
850	Light Up the Stage	card_image_850
851	Light of the Legion	card_image_851
852	Lightning Stormkin	card_image_852
853	Liliana's Triumph	card_image_853
854	Liliana, Dreadhorde General	card_image_854
855	Linden, the Steadfast Queen	card_image_855
856	Living Twister	card_image_856
857	Loaming Shaman	card_image_857
858	Loathsome Chimera	card_image_858
859	Loch Dragon	card_image_859
860	Lochmere Serpent	card_image_860
861	Locthwain Gargoyle	card_image_861
862	Locthwain Paladin	card_image_862
863	Lonesome Unicorn	card_image_863
864	Lost Legion	card_image_864
865	Lotleth Giant	card_image_865
866	Lotus Field	card_image_866
867	Lovestruck Beast	card_image_867
868	Loxodon Lifechanter	card_image_868
869	Loxodon Restorer	card_image_869
870	Loxodon Sergeant	card_image_870
871	Loyal Pegasus	card_image_871
872	Lucky Clover	card_image_872
873	Lumbering Battlement	card_image_873
874	Luminous Bonds	card_image_874
875	Macabre Mockery	card_image_875
876	Mace of the Valiant	card_image_876
877	Mad Ratter	card_image_877
878	Makeshift Battalion	card_image_878
879	Malevolent Noble	card_image_879
880	Mammoth Spider	card_image_880
881	Mana Geode	card_image_881
882	Maniacal Rage	card_image_882
883	Manifold Key	card_image_883
884	Mantle of Tides	card_image_884
885	Mantle of the Wolf	card_image_885
886	Maraleaf Pixie	card_image_886
887	Maraleaf Rider	card_image_887
888	Marauder's Axe	card_image_888
889	Marauding Raptor	card_image_889
890	March of the Multitudes	card_image_890
891	Martyr for the Cause	card_image_891
892	Mask of Immolation	card_image_892
893	Mass Manipulation	card_image_893
894	Massacre Girl	card_image_894
895	Master Splicer	card_image_895
896	Masterful Replication	card_image_896
897	Mausoleum Secrets	card_image_897
898	Maximize Altitude	card_image_898
899	Maximize Velocity	card_image_899
900	Mayhem Devil	card_image_900
901	Medomai's Prophecy	card_image_901
902	Memory Drain	card_image_902
903	Memory Theft	card_image_903
904	Mephitic Vapors	card_image_904
905	Merchant of the Vale	card_image_905
906	Merfolk Secretkeeper	card_image_906
907	Merfolk Skydiver	card_image_907
908	Mesmeric Glare	card_image_908
909	Mesmerizing Benthid	card_image_909
910	Meteor Golem	card_image_910
911	Metropolis Sprite	card_image_911
912	Midnight Clock	card_image_912
913	Midnight Reaper	card_image_913
914	Might of the Masses	card_image_914
915	Mind Rot	card_image_915
916	Mindwrack Harpy	card_image_916
917	Minion's Return	card_image_917
918	Ministrant of Obligation	card_image_918
919	Mire Triton	card_image_919
920	Mire's Grasp	card_image_920
921	Mirror March	card_image_921
922	Mirror Shield	card_image_922
923	Mirrormade	card_image_923
924	Mischievous Chimera	card_image_924
925	Mission Briefing	card_image_925
926	Mistford River Turtle	card_image_926
927	Mizzium Tank	card_image_927
928	Mnemonic Betrayal	card_image_928
929	Moat Piranhas	card_image_929
930	Mobilized District	card_image_930
931	Mogis's Favor	card_image_931
932	Molderhulk	card_image_932
933	Moldervine Reclamation	card_image_933
934	Moment of Heroism	card_image_934
935	Moodmark Painter	card_image_935
936	Moonlit Scavengers	card_image_936
937	Moorland Inquisitor	card_image_937
938	Mortify	card_image_938
939	Moss Viper	card_image_939
940	Mountain	card_image_940
941	Mowu, Loyal Companion	card_image_941
942	Mu Yanling, Celestial Wind	card_image_942
943	Mu Yanling, Sky Dancer	card_image_943
944	Murder	card_image_944
945	Murderous Rider	card_image_945
946	Murmuring Mystic	card_image_946
947	Muse Drake	card_image_947
948	Mysterious Pathlighter	card_image_948
949	Mystic Forge	card_image_949
950	Mystic Repeal	card_image_950
951	Mystic Sanctuary	card_image_951
952	Mystical Dispute	card_image_952
953	Nadir Kraken	card_image_953
954	Naga Eternal	card_image_954
955	Nahiri's Stoneblades	card_image_955
956	Nahiri, Storm of Stone	card_image_956
957	Naiad of Hidden Coves	card_image_957
958	Narcomoeba	card_image_958
959	Narset's Reversal	card_image_959
960	Narset, Parter of Veils	card_image_960
961	Natural End	card_image_961
962	Necrotic Wound	card_image_962
963	Negate	card_image_963
964	Neheb, Dreadhorde Champion	card_image_964
965	Neoform	card_image_965
966	Nessian Boar	card_image_966
967	Nessian Hornbeetle	card_image_967
968	Nessian Wanderer	card_image_968
969	Netcaster Spider	card_image_969
970	Never Happened	card_image_970
971	New Horizons	card_image_971
972	Nexus Wardens	card_image_972
973	Nicol Bolas, Dragon-God	card_image_973
974	Nightmare Shepherd	card_image_974
975	Nightpack Ambusher	card_image_975
976	Nightveil Predator	card_image_976
977	Nightveil Sprite	card_image_977
978	Nikya of the Old Ways	card_image_978
979	Nimble Birdsticker	card_image_979
980	Nissa's Triumph	card_image_980
981	Nissa, Who Shakes the World	card_image_981
982	Niv-Mizzet Reborn	card_image_982
983	Niv-Mizzet, Parun	card_image_983
984	No Escape	card_image_984
985	Notion Rain	card_image_985
986	Noxious Grasp	card_image_986
987	Noxious Groodion	card_image_987
988	Nullhide Ferox	card_image_988
989	Nylea's Forerunner	card_image_989
990	Nylea's Huntmaster	card_image_990
991	Nylea's Intervention	card_image_991
992	Nylea, Keen-Eyed	card_image_992
993	Nyx Herald	card_image_993
994	Nyx Lotus	card_image_994
995	Nyxbloom Ancient	card_image_995
996	Nyxborn Brute	card_image_996
997	Nyxborn Colossus	card_image_997
998	Nyxborn Courser	card_image_998
999	Nyxborn Marauder	card_image_999
1000	Nyxborn Seaguard	card_image_1000
1001	Oaken Boon	card_image_1001
1002	Oakenform	card_image_1002
1003	Oakhame Adversary	card_image_1003
1004	Oakhame Ranger	card_image_1004
1005	Oath of Kaya	card_image_1005
1006	Oathsworn Knight	card_image_1006
1007	Ob Nixilis's Cruelty	card_image_1007
1008	Ob Nixilis, the Hate-Twisted	card_image_1008
1009	Ochran Assassin	card_image_1009
1010	Octoprophet	card_image_1010
1011	Ogre Errant	card_image_1011
1012	Ogre Siegebreaker	card_image_1012
1013	Oko's Accomplices	card_image_1013
1014	Oko's Hospitality	card_image_1014
1015	Oko, the Trickster	card_image_1015
1016	Omen of the Dead	card_image_1016
1017	Omen of the Forge	card_image_1017
1018	Omen of the Hunt	card_image_1018
1019	Omen of the Sea	card_image_1019
1020	Omen of the Sun	card_image_1020
1021	Omnath, Locus of the Roil	card_image_1021
1022	Omnispell Adept	card_image_1022
1023	On Alert	card_image_1023
1024	Once and Future	card_image_1024
1025	One with the Stars	card_image_1025
1026	Open the Gates	card_image_1026
1027	Opportunistic Dragon	card_image_1027
1028	Opt	card_image_1028
1029	Order of Midnight	card_image_1029
1030	Oread of Mountain's Blaze	card_image_1030
1031	Ornery Goblin	card_image_1031
1032	Orzhov Enforcer	card_image_1032
1033	Orzhov Guildgate	card_image_1033
1034	Orzhov Locket	card_image_1034
1035	Orzhov Racketeers	card_image_1035
1036	Outflank	card_image_1036
1037	Outlaws' Merriment	card_image_1037
1038	Outmuscle	card_image_1038
1039	Overcome	card_image_1039
1040	Overgrown Tomb	card_image_1040
1041	Overgrowth Elemental	card_image_1041
1042	Overwhelmed Apprentice	card_image_1042
1043	Ox of Agonas	card_image_1043
1044	Pacifism	card_image_1044
1045	Pack Mastiff	card_image_1045
1046	Pack's Favor	card_image_1046
1047	Paradise Druid	card_image_1047
1048	Parhelion II	card_image_1048
1049	Parhelion Patrol	card_image_1049
1050	Passwall Adept	card_image_1050
1051	Pattern Matcher	card_image_1051
1052	Pause for Reflection	card_image_1052
1053	Pelt Collector	card_image_1053
1054	Persistent Petitioners	card_image_1054
1055	Pestilent Spirit	card_image_1055
1056	Petty Theft	card_image_1056
1057	Phalanx Tactics	card_image_1057
1058	Phantom Warrior	card_image_1058
1059	Pharika's Libation	card_image_1059
1060	Pharika's Spawn	card_image_1060
1061	Pheres-Band Brawler	card_image_1061
1062	Phoenix of Ash	card_image_1062
1063	Pilfering Imp	card_image_1063
1064	Pious Wayfarer	card_image_1064
1065	Piper of the Swarm	card_image_1065
1066	Piston-Fist Cyclops	card_image_1066
1067	Pitiless Gorgon	card_image_1067
1068	Pitiless Pontiff	card_image_1068
1069	Plague Wight	card_image_1069
1070	Plaguecrafter	card_image_1070
1071	Plains	card_image_1071
1072	Planar Cleansing	card_image_1072
1073	Planewide Celebration	card_image_1073
1074	Plaza of Harmony	card_image_1074
1075	Pledge of Unity	card_image_1075
1076	Plummet	card_image_1076
1077	Pollenbright Druid	card_image_1077
1078	Polukranos, Unchained	card_image_1078
1079	Portal of Sanctuary	card_image_1079
1080	Portcullis Vine	card_image_1080
1081	Portent of Betrayal	card_image_1081
1082	Pouncing Lynx	card_image_1082
1083	Precision Bolt	card_image_1083
1084	Precognitive Perception	card_image_1084
1085	Prey Upon	card_image_1085
1086	Price of Betrayal	card_image_1086
1087	Price of Fame	card_image_1087
1088	Priest of Forgotten Gods	card_image_1088
1089	Prime Speaker Vannifar	card_image_1089
1090	Primordial Wurm	card_image_1090
1091	Prismite	card_image_1091
1092	Prison Realm	card_image_1092
1093	Prized Griffin	card_image_1093
1094	Prized Unicorn	card_image_1094
1095	Profane Insight	card_image_1095
1096	Prophet of the Peak	card_image_1096
1097	Protean Thaumaturge	card_image_1097
1098	Prowling Caracal	card_image_1098
1099	Prying Eyes	card_image_1099
1100	Pteramander	card_image_1100
1101	Pulse of Murasa	card_image_1101
1102	Purphoros's Intervention	card_image_1102
1103	Purphoros, Bronze-Blooded	card_image_1103
1104	Pyroclastic Elemental	card_image_1104
1105	Quasiduplicate	card_image_1105
1106	Queen of Ice	card_image_1106
1107	Quench	card_image_1107
1108	Questing Beast	card_image_1108
1109	Rabid Bite	card_image_1109
1110	Radical Idea	card_image_1110
1111	Rafter Demon	card_image_1111
1112	Rage of Winter	card_image_1112
1113	Rage-Scarred Berserker	card_image_1113
1114	Ragefire	card_image_1114
1115	Raging Kronch	card_image_1115
1116	Raging Redcap	card_image_1116
1117	Raise the Alarm	card_image_1117
1118	Rakdos Firewheeler	card_image_1118
1119	Rakdos Guildgate	card_image_1119
1120	Rakdos Locket	card_image_1120
1121	Rakdos Roustabout	card_image_1121
1122	Rakdos Trumpeter	card_image_1122
1123	Rakdos, the Showstopper	card_image_1123
1124	Ral's Dispersal	card_image_1124
1125	Ral's Outburst	card_image_1125
1126	Ral's Staticaster	card_image_1126
1127	Ral, Caller of Storms	card_image_1127
1128	Ral, Izzet Viceroy	card_image_1128
1129	Ral, Storm Conduit	card_image_1129
1130	Rally for the Throne	card_image_1130
1131	Rally of Wings	card_image_1131
1132	Rally to Battle	card_image_1132
1133	Rampage of the Clans	card_image_1133
1134	Rampaging Monument	card_image_1134
1135	Rampaging Rendhorn	card_image_1135
1136	Rampart Smasher	card_image_1136
1137	Rankle, Master of Pranks	card_image_1137
1138	Rapacious Dragon	card_image_1138
1139	Ravager Wurm	card_image_1139
1140	Ravnica at War	card_image_1140
1141	Realm-Cloaked Giant	card_image_1141
1142	Reaper of Night	card_image_1142
1143	Reave Soul	card_image_1143
1144	Reckless Air Strike	card_image_1144
1145	Redcap Melee	card_image_1145
1146	Redcap Raiders	card_image_1146
1147	Reduce to Ashes	card_image_1147
1148	Regenesis	card_image_1148
1149	Relentless Advance	card_image_1149
1150	Relentless Pursuit	card_image_1150
1151	Renata, Called to the Hunt	card_image_1151
1152	Renowned Weaponsmith	card_image_1152
1153	Repeated Reverberation	card_image_1153
1154	Replicate	card_image_1154
1155	Repudiate	card_image_1155
1156	Rescuer Sphinx	card_image_1156
1157	Resolute Rider	card_image_1157
1158	Resolute Watchdog	card_image_1158
1159	Response	card_image_1159
1160	Resurgence	card_image_1160
1161	Retributive Wand	card_image_1161
1162	Return of the Wildspeaker	card_image_1162
1163	Return to Nature	card_image_1163
1164	Revenge	card_image_1164
1165	Revenge of Ravens	card_image_1165
1166	Reverent Hoplite	card_image_1166
1167	Revival	card_image_1167
1168	Revoke Existence	card_image_1168
1169	Rhizome Lurcher	card_image_1169
1170	Rhythm of the Wild	card_image_1170
1171	Riddlemaster Sphinx	card_image_1171
1172	Rider in Need	card_image_1172
1173	Rienne, Angel of Rebirth	card_image_1173
1174	Righteous Blow	card_image_1174
1175	Righteousness	card_image_1175
1176	Rimrock Knight	card_image_1176
1177	Ripscale Predator	card_image_1177
1178	Riptide Turtle	card_image_1178
1179	Rise to Glory	card_image_1179
1180	Risen Reef	card_image_1180
1181	Rising Populace	card_image_1181
1182	Risk Factor	card_image_1182
1183	Ritual of Soot	card_image_1183
1184	Rix Maadi Reveler	card_image_1184
1185	Roalesk, Apex Hybrid	card_image_1185
1186	Robber of the Rich	card_image_1186
1187	Roc Charger	card_image_1187
1188	Role Reversal	card_image_1188
1189	Root Snare	card_image_1189
1190	Rosemane Centaur	card_image_1190
1191	Rosethorn Acolyte	card_image_1191
1192	Rosethorn Halberd	card_image_1192
1193	Rotting Regisaur	card_image_1193
1194	Roving Keep	card_image_1194
1195	Rowan's Battleguard	card_image_1195
1196	Rowan's Stalwarts	card_image_1196
1197	Rowan, Fearless Sparkmage	card_image_1197
1198	Rubble Reading	card_image_1198
1199	Rubble Slinger	card_image_1199
1200	Rubblebelt Boar	card_image_1200
1201	Rubblebelt Recluse	card_image_1201
1202	Rubblebelt Rioters	card_image_1202
1203	Rubblebelt Runner	card_image_1203
1204	Rugged Highlands	card_image_1204
1205	Rule of Law	card_image_1205
1206	Rumbling Ruin	card_image_1206
1207	Rumbling Sentry	card_image_1207
1208	Run Away Together	card_image_1208
1209	Runaway Steam-Kin	card_image_1209
1210	Sacred Foundry	card_image_1210
1211	Sage of Mysteries	card_image_1211
1212	Sage of the Falls	card_image_1212
1213	Sage's Row Denizen	card_image_1213
1214	Sage's Row Savant	card_image_1214
1215	Sagittars' Volley	card_image_1215
1216	Saheeli's Silverwing	card_image_1216
1217	Saheeli, Sublime Artificer	card_image_1217
1218	Salvager of Ruin	card_image_1218
1219	Samut's Sprint	card_image_1219
1220	Samut, Tyrant Smasher	card_image_1220
1221	Sanitarium Skeleton	card_image_1221
1222	Sarkhan the Masterless	card_image_1222
1223	Sarkhan's Catharsis	card_image_1223
1224	Saruli Caretaker	card_image_1224
1225	Satyr's Cunning	card_image_1225
1226	Sauroform Hybrid	card_image_1226
1227	Savage Gorger	card_image_1227
1228	Savage Smash	card_image_1228
1229	Savannah Sage	card_image_1229
1230	Savvy Hunter	card_image_1230
1231	Scalding Cauldron	card_image_1231
1232	Scampering Scorcher	card_image_1232
1233	Scavenging Harpy	card_image_1233
1234	Scheming Symmetry	card_image_1234
1235	Scholar of the Ages	card_image_1235
1236	Scorch Spitter	card_image_1236
1237	Scorching Dragonfire	card_image_1237
1238	Scorchmark	card_image_1238
1239	Scoured Barrens	card_image_1239
1240	Scrabbling Claws	card_image_1240
1241	Screaming Shield	card_image_1241
1242	Scuttlegator	card_image_1242
1243	Scuttlemutt	card_image_1243
1244	Sea God's Scorn	card_image_1244
1245	Searing Barrage	card_image_1245
1246	Season of Growth	card_image_1246
1247	Seasonal Ritual	card_image_1247
1248	Sedge Scorpion	card_image_1248
1249	Selective Snare	card_image_1249
1250	Selesnya Guildgate	card_image_1250
1251	Selesnya Locket	card_image_1251
1252	Senate Courier	card_image_1252
1253	Senate Griffin	card_image_1253
1254	Senate Guildmage	card_image_1254
1255	Sentinel's Eyes	card_image_1255
1256	Sentinel's Mark	card_image_1256
1257	Sephara, Sky's Blade	card_image_1257
1258	Seraph of the Scales	card_image_1258
1259	Serpent of Yawning Depths	card_image_1259
1260	Serra's Guardian	card_image_1260
1261	Setessan Champion	card_image_1261
1262	Setessan Petitioner	card_image_1262
1263	Setessan Skirmisher	card_image_1263
1264	Setessan Training	card_image_1264
1265	Seven Dwarves	card_image_1265
1266	Severed Strands	card_image_1266
1267	Shadowspear	card_image_1267
1268	Shambling Suit	card_image_1268
1269	Shared Summons	card_image_1269
1270	Sharktocrab	card_image_1270
1271	Shatter the Sky	card_image_1271
1272	Shepherd of the Flock	card_image_1272
1273	Shield's Might	card_image_1273
1274	Shifting Ceratops	card_image_1274
1275	Shimmer Dragon	card_image_1275
1276	Shimmer of Possibility	card_image_1276
1277	Shimmerwing Chimera	card_image_1277
1278	Shinechaser	card_image_1278
1279	Shining Armor	card_image_1279
1280	Shivan Dragon	card_image_1280
1281	Shoal Kraken	card_image_1281
1282	Shock	card_image_1282
1283	Show of Valor	card_image_1283
1284	Shriekdiver	card_image_1284
1285	Siege Mastodon	card_image_1285
1286	Siege Wurm	card_image_1286
1287	Signpost Scarecrow	card_image_1287
1288	Silent Dart	card_image_1288
1289	Silent Submersible	card_image_1289
1290	Silhana Wayfinder	card_image_1290
1291	Silverback Shaman	card_image_1291
1292	Silverflame Ritual	card_image_1292
1293	Silverflame Squire	card_image_1293
1294	Silverwing Squadron	card_image_1294
1295	Simic Ascendancy	card_image_1295
1296	Simic Guildgate	card_image_1296
1297	Simic Locket	card_image_1297
1298	Single Combat	card_image_1298
1299	Sinister Sabotage	card_image_1299
1300	Siona, Captain of the Pyleas	card_image_1300
1301	Skarrgan Hellkite	card_image_1301
1302	Skatewing Spy	card_image_1302
1303	Skeleton Archer	card_image_1303
1304	Skewer the Critics	card_image_1304
1305	Skitter Eel	card_image_1305
1306	Skola Grovedancer	card_image_1306
1307	Skophos Maze-Warden	card_image_1307
1308	Skophos Warleader	card_image_1308
1309	Skullknocker Ogre	card_image_1309
1310	Sky Tether	card_image_1310
1311	Sky Theater Strix	card_image_1311
1312	Skyknight Legionnaire	card_image_1312
1313	Skyknight Vanguard	card_image_1313
1314	Skyline Scout	card_image_1314
1315	Slaughter-Priest of Mogis	card_image_1315
1316	Slaying Fire	card_image_1316
1317	Sleep Paralysis	card_image_1317
1318	Sleep of the Dead	card_image_1318
1319	Slimebind	card_image_1319
1320	Smelt-Ward Ignus	card_image_1320
1321	Smelt-Ward Minotaur	card_image_1321
1322	Smitten Swordmaster	card_image_1322
1323	Smothering Tithe	card_image_1323
1324	Snapping Drake	card_image_1324
1325	Snarespinner	card_image_1325
1326	So Tiny	card_image_1326
1327	Solar Blaze	card_image_1327
1328	Sonic Assault	card_image_1328
1329	Sorcerer of the Fang	card_image_1329
1330	Sorcerer's Broom	card_image_1330
1331	Sorcerous Spyglass	card_image_1331
1332	Sorin's Guide	card_image_1332
1333	Sorin's Thirst	card_image_1333
1334	Sorin, Imperious Bloodlord	card_image_1334
1335	Sorin, Vampire Lord	card_image_1335
1336	Sorin, Vengeful Bloodlord	card_image_1336
1337	Soul Diviner	card_image_1337
1338	Soul Salvage	card_image_1338
1339	Soul-Guide Lantern	card_image_1339
1340	Soulmender	card_image_1340
1341	Soulreaper of Mogis	card_image_1341
1342	Spark Double	card_image_1342
1343	Spark Harvest	card_image_1343
1344	Spark Reaper	card_image_1344
1345	Spawn of Mayhem	card_image_1345
1346	Spear Spewer	card_image_1346
1347	Specter's Shriek	card_image_1347
1348	Spectral Sailor	card_image_1348
1349	Spellgorger Weird	card_image_1349
1350	Spellkeeper Weird	card_image_1350
1351	Sphinx Mindbreaker	card_image_1351
1352	Sphinx of Foresight	card_image_1352
1353	Sphinx of New Prahv	card_image_1353
1354	Sphinx of the Guildpact	card_image_1354
1355	Sphinx's Insight	card_image_1355
1356	Spikewheel Acrobat	card_image_1356
1357	Spinal Centipede	card_image_1357
1358	Spinning Wheel	card_image_1358
1359	Spire Mangler	card_image_1359
1360	Spirit of the Spires	card_image_1360
1361	Sporecap Spider	card_image_1361
1362	Sprouting Renewal	card_image_1362
1363	Squad Captain	card_image_1363
1364	Staggering Insight	card_image_1364
1365	Stampede Rider	card_image_1365
1366	Starfield Mystic	card_image_1366
1367	Starlit Mantle	card_image_1367
1368	Statue	card_image_1368
1369	Status	card_image_1369
1370	Steadfast Sentry	card_image_1370
1371	Steady Aim	card_image_1371
1372	Stealth Mission	card_image_1372
1373	Steam Vents	card_image_1373
1374	Steel Overseer	card_image_1374
1375	Steelbane Hydra	card_image_1375
1376	Steelclaw Lance	card_image_1376
1377	Steelgaze Griffin	card_image_1377
1378	Steeple Creeper	card_image_1378
1379	Stern Dismissal	card_image_1379
1380	Stinging Lionfish	card_image_1380
1381	Stolen by the Fae	card_image_1381
1382	Stomp	card_image_1382
1383	Stomping Ground	card_image_1383
1384	Stone Golem	card_image_1384
1385	Stonecoil Serpent	card_image_1385
1386	Stony Strength	card_image_1386
1387	Storm Herald	card_image_1387
1388	Storm Strike	card_image_1388
1389	Storm the Citadel	card_image_1389
1390	Storm's Wrath	card_image_1390
1391	Stormfist Crusader	card_image_1391
1392	Storrev, Devkarin Lich	card_image_1392
1393	Street Riot	card_image_1393
1394	Sumala Woodshaper	card_image_1394
1395	Summary Judgment	card_image_1395
1396	Sunblade Angel	card_image_1396
1397	Sunder Shaman	card_image_1397
1398	Sundering Stroke	card_image_1398
1399	Sunhome Stalwart	card_image_1399
1400	Sunlit Hoplite	card_image_1400
1401	Sunmane Pegasus	card_image_1401
1402	Sure Strike	card_image_1402
1403	Swamp	card_image_1403
1404	Swarm Guildmage	card_image_1404
1405	Swathcutter Giant	card_image_1405
1406	Sweet Oblivion	card_image_1406
1407	Swift End	card_image_1407
1408	Swiftblade Vindicator	card_image_1408
1409	Swiftwater Cliffs	card_image_1409
1410	Swimmer in Nightmares	card_image_1410
1411	Swirling Torrent	card_image_1411
1412	Sworn Companions	card_image_1412
1413	Sylvan Brushstrider	card_image_1413
1414	Syndicate Guildmage	card_image_1414
1415	Syndicate Messenger	card_image_1415
1416	Syr Alin, the Lion's Claw	card_image_1416
1417	Syr Carah, the Bold	card_image_1417
1418	Syr Elenora, the Discerning	card_image_1418
1419	Syr Faren, the Hengehammer	card_image_1419
1420	Syr Gwyn, Hero of Ashvale	card_image_1420
1421	Syr Konrad, the Grim	card_image_1421
1422	Tajic, Legion's Edge	card_image_1422
1423	Take Heart	card_image_1423
1424	Take Vengeance	card_image_1424
1425	Tale's End	card_image_1425
1426	Tall as a Beanstalk	card_image_1426
1427	Tamiyo's Epiphany	card_image_1427
1428	Tamiyo, Collector of Tales	card_image_1428
1429	Taranika, Akroan Veteran	card_image_1429
1430	Taste of Death	card_image_1430
1431	Tectonic Giant	card_image_1431
1432	Tectonic Rift	card_image_1432
1433	Teferi's Time Twist	card_image_1433
1434	Teferi, Time Raveler	card_image_1434
1435	Temple Garden	card_image_1435
1436	Temple Thief	card_image_1436
1437	Temple of Abandon	card_image_1437
1438	Temple of Deceit	card_image_1438
1439	Temple of Enlightenment	card_image_1439
1440	Temple of Epiphany	card_image_1440
1441	Temple of Malady	card_image_1441
1442	Temple of Malice	card_image_1442
1443	Temple of Mystery	card_image_1443
1444	Temple of Plenty	card_image_1444
1445	Temple of Silence	card_image_1445
1446	Temple of Triumph	card_image_1446
1447	Tempting Witch	card_image_1447
1448	Tenth District Guard	card_image_1448
1449	Tenth District Legionnaire	card_image_1449
1450	Tenth District Veteran	card_image_1450
1451	Territorial Boar	card_image_1451
1452	Terror of Mount Velus	card_image_1452
1453	Teyo's Lightshield	card_image_1453
1454	Teyo, the Shieldmage	card_image_1454
1455	Teysa Karlov	card_image_1455
1456	Tezzeret, Master of the Bridge	card_image_1456
1457	Thassa's Intervention	card_image_1457
1458	Thassa's Oracle	card_image_1458
1459	Thassa, Deep-Dwelling	card_image_1459
1460	Thaumaturge's Familiar	card_image_1460
1461	The Akroan War	card_image_1461
1462	The Binding of the Titans	card_image_1462
1463	The Birth of Meletis	card_image_1463
1464	The Cauldron of Eternity	card_image_1464
1465	The Circle of Loyalty	card_image_1465
1466	The Elderspell	card_image_1466
1467	The First Iroan Games	card_image_1467
1468	The Great Henge	card_image_1468
1469	The Haunt of Hightower	card_image_1469
1470	The Magic Mirror	card_image_1470
1471	The Royal Scions	card_image_1471
1472	The Triumph of Anax	card_image_1472
1473	The Wanderer	card_image_1473
1474	Theater of Horrors	card_image_1474
1475	Thicket Crasher	card_image_1475
1476	Thief of Sanity	card_image_1476
1477	Thirst for Meaning	card_image_1477
1478	Thirsting Bloodlord	card_image_1478
1479	Thirsting Shade	card_image_1479
1480	Thorn Mammoth	card_image_1480
1481	Thornwood Falls	card_image_1481
1482	Thought Collapse	card_image_1482
1483	Thought Distortion	card_image_1483
1484	Thought Erasure	card_image_1484
1485	Thoughtbound Phantasm	card_image_1485
1486	Thousand-Year Storm	card_image_1486
1487	Thrash	card_image_1487
1488	Thrashing Brontodon	card_image_1488
1489	Threat	card_image_1489
1490	Threnody Singer	card_image_1490
1491	Thrill of Possibility	card_image_1491
1492	Thryx, the Sudden Storm	card_image_1492
1493	Thunder Drake	card_image_1493
1494	Thundering Ceratok	card_image_1494
1495	Thundering Chariot	card_image_1495
1496	Thunderkin Awakener	card_image_1496
1497	Thunderous Snapper	card_image_1497
1498	Tibalt's Rager	card_image_1498
1499	Tibalt, Rakish Instigator	card_image_1499
1500	Time Wipe	card_image_1500
1501	Tin Street Dodger	card_image_1501
1502	Titanic Brawl	card_image_1502
1503	Titanic Growth	card_image_1503
1504	Tithe Taker	card_image_1504
1505	Tithebearer Giant	card_image_1505
1506	Toll of the Invasion	card_image_1506
1507	Tolsimir, Friend to Wolves	card_image_1507
1508	Tome Raider	card_image_1508
1509	Tome of Legends	card_image_1509
1510	Tome of the Guildpact	card_image_1510
1511	Tomebound Lich	card_image_1511
1512	Tomik, Distinguished Advokist	card_image_1512
1513	Topple the Statue	card_image_1513
1514	Torbran, Thane of Red Fell	card_image_1514
1515	Torch Courier	card_image_1515
1516	Totally Lost	card_image_1516
1517	Tournament Grounds	card_image_1517
1518	Tower Defense	card_image_1518
1519	Towering-Wave Mystic	card_image_1519
1520	Trail of Crumbs	card_image_1520
1521	Tranquil Cove	card_image_1521
1522	Transcendent Envoy	card_image_1522
1523	Trapped in the Tower	card_image_1523
1524	Traveler's Amulet	card_image_1524
1525	Treacherous Blessing	card_image_1525
1526	Treats to Share	card_image_1526
1527	Treeshaker Chimera	card_image_1527
1528	Triton Waverider	card_image_1528
1529	Triumphant Surge	card_image_1529
1530	Trollbred Guardian	card_image_1530
1531	Trostani Discordant	card_image_1531
1532	True Love's Kiss	card_image_1532
1533	Truefire Captain	card_image_1533
1534	Trusted Pegasus	card_image_1534
1535	Tuinvale Treefolk	card_image_1535
1536	Turn into a Pumpkin	card_image_1536
1537	Turret Ogre	card_image_1537
1538	Twilight Panther	card_image_1538
1539	Twinblade Paladin	card_image_1539
1540	Tymaret Calls the Dead	card_image_1540
1541	Tymaret, Chosen from Death	card_image_1541
1542	Tyrant's Scorn	card_image_1542
1543	Ugin's Conjurant	card_image_1543
1544	Ugin, the Ineffable	card_image_1544
1545	Unbreakable Formation	card_image_1545
1546	Uncaged Fury	card_image_1546
1547	Unchained Berserker	card_image_1547
1548	Undead Servant	card_image_1548
1549	Undercity Necrolisk	card_image_1549
1550	Undercity Scavenger	card_image_1550
1551	Undercity Uprising	card_image_1551
1552	Undercity's Embrace	card_image_1552
1553	Underrealm Lich	card_image_1553
1554	Underworld Breach	card_image_1554
1555	Underworld Charger	card_image_1555
1556	Underworld Dreams	card_image_1556
1557	Underworld Fires	card_image_1557
1558	Underworld Rage-Hound	card_image_1558
1559	Underworld Sentinel	card_image_1559
1560	Unexplained Disappearance	card_image_1560
1561	Unexplained Vision	card_image_1561
1562	Unholy Indenture	card_image_1562
1563	Unknown Shores	card_image_1563
1564	Unlikely Aid	card_image_1564
1565	Unmoored Ego	card_image_1565
1566	Unsummon	card_image_1566
1567	Urban Utopia	card_image_1567
1568	Uro, Titan of Nature's Wrath	card_image_1568
1569	Usher to Safety	card_image_1569
1570	Vampire Opportunist	card_image_1570
1571	Vampire of the Dire Moon	card_image_1571
1572	Vantress Gargoyle	card_image_1572
1573	Vantress Paladin	card_image_1573
1574	Vedalken Mesmerist	card_image_1574
1575	Veiled Shade	card_image_1575
1576	Venerable Knight	card_image_1576
1577	Venerated Loxodon	card_image_1577
1578	Vengeful Warchief	card_image_1578
1579	Venomous Hierophant	card_image_1579
1580	Venture Deeper	card_image_1580
1581	Verity Circle	card_image_1581
1582	Vernadi Shieldmate	card_image_1582
1583	Vexing Gull	card_image_1583
1584	Vial of Dragonfire	card_image_1584
1585	Vicious Rumors	card_image_1585
1586	Victory's Envoy	card_image_1586
1587	Vigorspore Wurm	card_image_1587
1588	Vilis, Broker of Blood	card_image_1588
1589	Vindictive Vampire	card_image_1589
1590	Vivid Revival	card_image_1590
1591	Vivien's Arkbow	card_image_1591
1592	Vivien's Crocodile	card_image_1592
1593	Vivien's Grizzly	card_image_1593
1594	Vivien, Arkbow Ranger	card_image_1594
1595	Vivien, Champion of the Wilds	card_image_1595
1596	Vivien, Nature's Avenger	card_image_1596
1597	Vizier of the Scorpion	card_image_1597
1598	Vizkopa Vampire	card_image_1598
1599	Volcanic Dragon	card_image_1599
1600	Voracious Hydra	card_image_1600
1601	Voracious Typhon	card_image_1601
1602	Vorstclaw	card_image_1602
1603	Vraska's Finisher	card_image_1603
1604	Vraska's Stoneglare	card_image_1604
1605	Vraska, Golgari Queen	card_image_1605
1606	Vraska, Regal Gorgon	card_image_1606
1607	Vraska, Swarm's Eminence	card_image_1607
1608	Wakeroot Elemental	card_image_1608
1609	Walking Corpse	card_image_1609
1610	Wall of Lost Thoughts	card_image_1610
1611	Wall of Mist	card_image_1611
1612	Wall of Runes	card_image_1612
1613	Wand of Vertebrae	card_image_1613
1614	Wanderer's Strike	card_image_1614
1615	Wandermare	card_image_1615
1616	War Screecher	card_image_1616
1617	Warbriar Blessing	card_image_1617
1618	Warden	card_image_1618
1619	Warden of Evos Isle	card_image_1619
1620	Warden of the Chained	card_image_1620
1621	Wardscale Crocodile	card_image_1621
1622	Warrant	card_image_1622
1623	Wary Okapi	card_image_1623
1624	Watcher in the Mist	card_image_1624
1625	Watchful Giant	card_image_1625
1626	Waterkin Shaman	card_image_1626
1627	Watery Grave	card_image_1627
1628	Wavebreak Hippocamp	card_image_1628
1629	Weapon Rack	card_image_1629
1630	Weaselback Redcap	card_image_1630
1631	Wee Dragonauts	card_image_1631
1632	Welcome Home	card_image_1632
1633	Whirlwind Denial	card_image_1633
1634	Whisper Agent	card_image_1634
1635	Whispering Snitch	card_image_1635
1636	Wicked Guardian	card_image_1636
1637	Wicked Wolf	card_image_1637
1638	Widespread Brutality	card_image_1638
1639	Wild Ceratok	card_image_1639
1640	Wildborn Preserver	card_image_1640
1641	Wilderness Reclamation	card_image_1641
1642	Wildfire Elemental	card_image_1642
1643	Wildwood Tracker	card_image_1643
1644	Wind-Scarred Crag	card_image_1644
1645	Windstorm Drake	card_image_1645
1646	Winged Words	card_image_1646
1647	Wings of Hubris	card_image_1647
1648	Wintermoor Commander	card_image_1648
1649	Wishclaw Talisman	card_image_1649
1650	Wishcoin Crab	card_image_1650
1651	Wishful Merfolk	card_image_1651
1652	Witch's Cottage	card_image_1652
1653	Witch's Oven	card_image_1653
1654	Witch's Vengeance	card_image_1654
1655	Witching Well	card_image_1655
1656	Witness of Tomorrows	card_image_1656
1657	Woe Strider	card_image_1657
1658	Wojek Bodyguard	card_image_1658
1659	Wolf's Quarry	card_image_1659
1660	Wolfkin Bond	card_image_1660
1661	Wolfrider's Saddle	card_image_1661
1662	Wolfwillow Haven	card_image_1662
1663	Woodland Champion	card_image_1663
1664	Woodland Mystic	card_image_1664
1665	Workshop Elders	card_image_1665
1666	Worldsoul Colossus	card_image_1666
1667	Worthy Knight	card_image_1667
1668	Wrap in Flames	card_image_1668
1669	Wrecking Beast	card_image_1669
1670	Yanling's Harbinger	card_image_1670
1671	Yarok's Fenlurker	card_image_1671
1672	Yarok's Wavecrasher	card_image_1672
1673	Yarok, the Desecrated	card_image_1673
1674	Yoked Ox	card_image_1674
1675	Yorvo, Lord of Garenbrig	card_image_1675
1676	Youthful Knight	card_image_1676
1677	Zegana, Utopian Speaker	card_image_1677
1678	Zephyr Charge	card_image_1678
1679	Zhur-Taa Goblin	card_image_1679
\.


--
-- Name: TABLE "Images"; Type: ACL; Schema: C09; Owner: postgres
--

GRANT ALL ON TABLE "C09"."Images" TO "C09";


--
-- PostgreSQL database dump complete
--

